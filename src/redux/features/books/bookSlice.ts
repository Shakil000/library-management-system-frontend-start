import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    books: [],
}
const initialState : initialState = {
    books: [],
}

const booksSlice = createSlice({
    name: "Books",
    initialState,
    reducers: {}
})

export default booksSlice.reducer;