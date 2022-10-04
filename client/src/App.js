import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Cookies from 'js-cookie';
import { useState } from "react";

const App = () => {
  //get user from cookie
  let [user, setUser] = useState(Cookies.get('token'));

  return ( 
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* conditional rendering home page */}
        <Route path="/" element={
          user ? <Notes /> : <Navigate replace={true} to="/login" />
        }  />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/logout" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;