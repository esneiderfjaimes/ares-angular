import { Loan } from "./loan";

export interface User {
  id: string;
  email: string;
  imageUrl: string | null;
  name: string;
  loans: Loan[];
}
