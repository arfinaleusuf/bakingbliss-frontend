import { createBrowserRouter } from "react-router";
import Roots from "../layout/Roots";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import AdminProtected from "./AdminProtected";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import Add_Product from "../pages/admin/Add_Product";
import Edit_Profile from "../pages/Edit_Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots/>,
    children:[
        {
            path:'/',
            element: <Home/>
        },
        {
          path:'/login',
          element: <Login/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
        {
          path: "/edit_profile",
          element: <Edit_Profile/>
        },
    ],
  },
  {
    path:"/admin",
    element: <AdminProtected><AdminLayout/></AdminProtected>,
    children:[
      {
        path:"dashboard",
        element: <Dashboard/>
      },
      {
        path:"add_porduct",
        element: <Add_Product/>
      }
    ],
  },
]);

export default router;