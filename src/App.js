import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Addproduct from "./Pages/Addproduct";
import AdminRegister from "./Pages/adminregister";
import AdminLogin from "./Pages/adminlogin";
import Menu from "./Component/Navbar";
import Viewproduct from "./Pages/Viewproduct";
import ViewOrder from "./Pages/ViewOrder";
import { RecoilRoot } from "recoil";

function App() {
  const router=createBrowserRouter(
    [
      {
        path:"/admin/login",
        element:<AdminLogin />
      },
      {
        path:"/admin",
        element:<><Menu /><ViewOrder /> </>
      },
      {
        path:"/admin/viewproduct",
        element:<><Menu /><Viewproduct /></>
      },
      {
      path:"/admin/addadmin",
      element:<><Menu /><AdminRegister /></>
      },
      {
        path:"/admin/addcan",
        element:<><Menu /><Addproduct /> </>
      }
    ]
  )
  return (
    <div>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  );
}

export default App;
