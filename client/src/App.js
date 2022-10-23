import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";
import NotFound from "./components/NotFound";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import Cookies from 'js-cookie';

const App = () => {
  //decode jwt token
  let decodedToken = decodeToken(Cookies.get('token'));

  console.log(`The decodedToken is`, decodedToken);

  let [user, setUser] = useState(decodedToken);

  return ( 
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* conditional rendering home page */}
        <Route path="/" element={
          user ? <Notes user={user} /> : <Navigate replace={true} to="/login" />
        }  />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  );
}

export default App;