export interface College {
  id: string;
  name: string;
  location: 'Greater Noida' | 'Noida';
  courses: string[];
  images: string[];
  description: string;
  fees: string;
  website: string;
  established: string;
  ranking?: string;
  facilities: string[];
  highlights: string[];
}