import App from "@/App";
import { UpdateBook } from "@/components/module/UpdateBook";
import Books from "@/pages/Books";
import Borrow from "@/pages/Borrow";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                index: true,
                element: <Books></Books>
            },
            {
                path: "edit-book/:id",
                element: <UpdateBook open={false} setOpen={function (): void {
                    throw new Error("Function not implemented.");
                } }></UpdateBook>
            },
            {
                path: "books",
                element: <Books></Books>
            },
            // {
            //    path: "create-books",
            //     element: <Home></Home>
            // },
            {
               path: "borrow-summary",
                element: <Borrow></Borrow>
            }
        ]
    }
]);

export default router;