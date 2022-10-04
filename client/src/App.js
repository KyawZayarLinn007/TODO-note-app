import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Cookies from 'js-cookie';

const App = () => {
  //get user from cookie
  let user = Cookies.get('token');

  return ( 
    <>
      <Navbar user={user} />
      <Routes>
        {/* conditional rendering home page */}
        <Route path="/" element={
          user ? <Notes /> : <Navigate replace={true} to="/login" />
        }  />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;