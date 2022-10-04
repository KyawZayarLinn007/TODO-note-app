import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function Navbar({ user }) {
  let activeStyle = {
    textDecoration: "underline",
  };
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
              <Button color="inherit">Logout</Button>
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
