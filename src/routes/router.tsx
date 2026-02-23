import App from "@/App";
import { UpdateBook } from "@/components/module/UpdateBook";
import Books from "@/pages/Books";
import Home from "@/pages/Home";
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
                element: <UpdateBook></UpdateBook>
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
                element: "showing borrow books"
            }
        ]
    }
]);

export default router;