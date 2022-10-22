import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  let activeStyle = {
    textDecoration: "underline",
  };

  let navigate = useNavigate();

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/logout`, {})
    .then(response => {
      console.log(`The response is`);
      console.log(response);

      if(!response.error){
        setUser(null);
        navigate("/login");
      }else{
        throw new Error(response.error)
      }
    })
    .catch(error => {
      console.log(`The error is`);
      console.log(error);
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <AutoStoriesIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="router-link">
              Notes
            </Link>
          </Typography>

          {/* conditional rendering btns */}
          {user ? (
            // logout btn
            <Link to="/logout" className="router-link">
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Link>
          ) : (
            <>
              {/* register btn */}
              <NavLink
                to="/register"
                className="router-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <Button color="inherit">Register</Button>
              </NavLink>
              {/* login btn */}
              <NavLink
                to="/login"
                className="router-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
