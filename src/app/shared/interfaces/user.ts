export interface User {
  id: string;
  email: string;
  imageUrl: string | null;
  name: string;
  isAdmin: boolean;
}