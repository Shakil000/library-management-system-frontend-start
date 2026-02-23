import type { IBook } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


interface initialState {
    books: IBook[],
}
const initialState : initialState = {
    books: [],
}

const booksSlice = createSlice({
    name: "Books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<IBook>) => {
            const id = uuidv4();

        const bookInfo = {
            ...action.payload,id,
        };
        state.books.push(bookInfo);
        }
    }
})

export const {addBook} =  booksSlice.actions;

export default booksSlice.reducer;