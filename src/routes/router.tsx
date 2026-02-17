import App from "@/App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "books",
                element: "books list"
            },
            {
               path: "create-books",
                element: "creating books"
            },
            {
               path: "borrow-summary",
                element: "showing borrow books"
            }
        ]
    }
]);

export default router;