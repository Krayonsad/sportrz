export interface GameInfo {
  id: string;
  name: string;
  categories: string[];
  path: string;
  thumbnail: string;
}
export interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  timestamp: number;
}