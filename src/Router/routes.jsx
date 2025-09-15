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
import ProtectedRoutes from "../Components/Common/ProtectedRoutes";
import RecipeDetails from "../Pages/RecipeDetails";
import Edit from "../Pages/Edit";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: (
      <ProtectedRoutes>
        <Recipes />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/liked",
    element: (
      <ProtectedRoutes>
        <Liked />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/logout",
    element: (
      <ProtectedRoutes>
        <Logout />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/nutrients",
    element: <Nutrients />,
  },
  {
    path: "/recipe",
    element: (
      <ProtectedRoutes>
        <Recipe />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/recipe-details/:id",
    element: (
      <ProtectedRoutes>
        <RecipeDetails />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/edit/:id",
    element: (
      <ProtectedRoutes>
        <Edit />
      </ProtectedRoutes>
    ),
  },

  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <div>Page not found</div> },
]);
