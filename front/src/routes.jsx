import { createBrowserRouter } from "react-router-dom"
import { redirect } from "react-router-dom"
import Home from "./pages/IndexComponent"
import Categories from "./pages/CategoriesComponent"
import Products from "./pages/ProductsComponent"
import History from "./pages/HistoryComponent"
import Login from "./pages/LoginComponent"
import Register from "./pages/RegisterComponent"

const requireLogin = () => {
    const user = JSON.parse(localStorage.getItem("users")) || {code: 0}
    if(user.code){
        return null
    }
    return redirect("/login")
}

const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />,
        loader: requireLogin
    },
    {
        path: '/categories',
        element: <Categories />,
        loader: requireLogin
    },
    {
        path: '/products',
        element: <Products />,
        loader: requireLogin
    },
    {
        path: '/history',
        element: <History />,
        loader: requireLogin
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },

])
export {router}