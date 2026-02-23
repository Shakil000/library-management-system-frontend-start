// types.ts
export interface IBook {
  id: string;
  title: string;
  author: string;
  genre?: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY" | "PERSONAL";
  isbn: string;
  description?: string;
  copies?: number;
  available?: boolean;
}


export interface IUser{
  id: string;
  user: string;
  email: string;
  date: string;
  role: "admin" | "manager" | "other";
}