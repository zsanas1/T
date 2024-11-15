export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  bannerUrl: string;
  capacity: number;
  registeredCount: number;
  createdBy: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}