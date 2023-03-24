import {Routes,Route} from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';
import { Signup } from './Client/signup';
import { Login } from './Client/login';
import Addproduct from './Admin/Addproduct';
import AdminRegister from './Admin/adminregister';
import AdminLogin from './Admin/adminlogin';
import Menu from './Admin/Navbar';
import {  Context } from './Admin/Context';
import Viewproduct from './Admin/Viewproduct';

function App() {
  return (
    <div>
      <Context>
      <Routes>
        
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

        
        <Route path="/admin/register" element={<> <Menu /><AdminRegister/></>}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin" element={<> <Menu /><Addproduct /></>}></Route>
        <Route path="/admin/adduser" element={<> <Menu /><AdminRegister /></>}></Route>
        <Route path="/admin/viewproduct" element={<><Menu /> <Viewproduct /></>}></Route>
      </Routes>
      </Context>
    </div>
  );
}

export default App;
