import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UpdateBook from "../components/UpdateBook";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import AddBook from "../pages/AddBook";
import Books from "../pages/Books";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ReadlingList from "../pages/ReadingList";
import Signup from "../pages/Signup";
import SingleBook from "../pages/SingleBook";
import { Wishlist } from "../pages/Wishlist";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Home />
                )
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/books", element:
  
                        <Books />
            },
            {
                path: "/book-details/:id", element:
                        <SingleBook />
   
            },
            {
                path: "/update-book/:bookId", element:
                        <UpdateBook />
   
            },
            {
                path: "/wishlist", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <Wishlist />
                    </AuthenticatedLayout>
            },
            {
                path: "/readinglist", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <ReadlingList />
                    </AuthenticatedLayout>
            },
            {
                path: "/addbook", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <AddBook />
                    </AuthenticatedLayout>
            },
        ]
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
])



export default router;