import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Recipes from "../Pages/Recipes";
import Liked from "../Pages/Liked";
import Logout from "../Pages/Logout";
import Nutrients from "../Pages/Nutrients";
import Recipe from "../Pages/Recipe";
import Profile from "../Pages/Profile";
import Signup from "../Components/Authentication/Signup";
import Login from "../Components/Authentication/Login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/liked",
    element: <Liked />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/nutrients",
    element: <Nutrients />,
  },
  {
    path: "/recipe",
    element: <Recipe />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
]);
