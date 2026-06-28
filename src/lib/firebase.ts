import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Reservation } from '../types';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
// Request the Google Drive file scope (allows creating/accessing files created by this app)
provider.addScope('https://www.googleapis.com/auth/drive.file');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // If logged in but token not in memory, we might need to prompt login again 
        // to get the access token, or use standard flow.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

/**
 * Saves a table reservation receipt to Google Drive.
 * Generates a beautifully formatted text file and uploads it.
 */
export const saveReservationToDrive = async (
  reservation: Reservation,
  accessToken: string
): Promise<{ fileId: string; fileUrl: string }> => {
  const boundary = 'haveli_dine_boundary_delimiter';
  
  const metadata = {
    name: `Haveli_Dine_Reservation_${reservation.id}.txt`,
    mimeType: 'text/plain',
    description: `Reservation booking details for ${reservation.name} at Haveli Dine.`,
  };

  const receiptContent = `
============================================================
             H A V E L I   D I N E
           A Royal Dining Experience
============================================================

Your royal table reservation has been confirmed. 
Below are your booking details:

Reservation ID:   ${reservation.id}
Date of Booking:  ${new Date(reservation.createdAt).toLocaleDateString()}

---------------- GUEST INFORMATION ----------------
Name:             ${reservation.name}
Email:            ${reservation.email}
Phone:            ${reservation.phone}

--------------- RESERVATION DETAILS ---------------
Date:             ${reservation.date}
Time:             ${reservation.time}
Guests:           ${reservation.guests} Person(s)
Special Requests: ${reservation.specialRequests || 'None'}

------------------------------------------------------------
Thank you for choosing Haveli Dine. We look forward to 
serving you with the finest culinary craftsmanship.

If you need to change or cancel your reservation, please 
contact us at reservations@havelidine.com or call +1 555-428-3544.

Haveli Dine - 120 Royal Palace Circle, Fine Dining District
============================================================
`;

  const multipartRequestBody =
    `\r\n--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset=UTF-8\r\n\r\n` +
    `${receiptContent.trim()}\r\n` +
    `--${boundary}--`;

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Google Drive Upload Failed:', errorBody);
    throw new Error(`Google Drive API responded with status ${response.status}`);
  }

  const result = await response.json();
  const fileId = result.id;
  const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;

  return { fileId, fileUrl };
};
