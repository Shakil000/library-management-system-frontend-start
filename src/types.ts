// types.ts
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre?: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY" | "PERSONAL";
  isbn: string;
  description?: string;
  copies?: number;
  available?: boolean;
  isBorrowed: boolean;
}
