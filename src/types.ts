export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'beverages';
  tags?: string[];
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
  driveFileId?: string;
  driveFileUrl?: string;
}
