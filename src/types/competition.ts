export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: string;
  registrationDeadline: string;
  maxTeamSize: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  bannerUrl: string;
  technologies: string[];
}