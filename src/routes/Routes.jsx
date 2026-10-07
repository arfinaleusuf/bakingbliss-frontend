import { createBrowserRouter } from "react-router";
import Roots from "../layout/Roots";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots/>,
    children:[
        {
            path:'/',
            element: <Home/>
        }
    ]
  },
]);

export default router;