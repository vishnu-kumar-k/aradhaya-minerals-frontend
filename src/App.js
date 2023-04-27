import {  createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Menu from "./Component/Navbar";
import FetchCan from "./Pages/FetchCan";
import FetchOrder from "./Pages/FetchOrder";
import { RecoilRoot } from "recoil";
import { Pincode } from "./Pages/Pincode";
import { Users } from "./Pages/Users";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router=createBrowserRouter(
    [
      {
        path:"/",
        element:<><Link to="/admin"></Link></>
      },
      {
        path:"/admin/login",
        element:<Login />
      },
      {
        path:"/admin",
        element:<><Menu /><FetchOrder /> </>
      },
      {
        path:"/admin/viewproduct",
        element:<><Menu /><FetchCan /></>
      },
      {
      path:"/admin/addadmin",
      element:<><Menu /><Admin /></>
      },
      {
        path:"/admin/pincode",
        element:<><Menu /><Pincode /></>
      },
      {
        path:"/admin/user",
        element:<><Menu /><Users /></>
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
