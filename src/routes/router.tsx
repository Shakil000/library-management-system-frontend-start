import App from "@/App";
import { UpdateBook } from "@/components/module/UpdateBook";
import Books from "@/pages/Books";
import Borrow from "@/pages/Borrow";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "edit-book/:id",
                element: <UpdateBook open={false} setOpen={function (): void {
                    throw new Error("Function not implemented.");
                } } book={undefined}></UpdateBook>
            },
            {
                path: "books",
                element: <Books></Books>
            },
            {
               path: "borrowed-book",
                element: <Borrow></Borrow>
            },
            {
               path: "borrow-summary",
                element: <BorrowSummary></BorrowSummary>
            }
        ]
    }
]);

export default router;