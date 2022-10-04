import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate   } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Login({setUser}) {
  const navigate = useNavigate();

  // password state
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // email state
  const [email, setEmail] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log(`The email is ${email} and password is ${values.password}`);
    axios.post("http://localhost:5000/login", {
      email, password: values.password
    })
    .then(response => {
      console.log(`The response is`);
      console.log(response);

      if(!response.error){
        //set user state
        console.log(`The token is`);
        console.log(Cookies.get("token"));
        setUser(Cookies.get("token"));
        navigate("/");
      }else{
        throw new Error(response.error)
      }
    })
    .catch(err => {
      console.log(`The error is`);
      console.log(err);
      navigate("/login");
    })
  };

  return (
    <>
      {/* heading */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "20px", marginTop: "100px" }}
      >
        <Typography variant="h5">Login</Typography>
      </Stack>

      {/* form div */}
      <Stack direction="row" justifyContent="center" alignItems="center">
        <div>
          {/* email */}
          <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </FormControl>

          {/* password */}
          <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              fullWidth
            />
          </FormControl>
        </div>
      </Stack>

      {/* Button */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "20px" }}
      >
        <Button variant="contained" onClick={handleSubmit}>Login</Button>
        <Typography variant="body1" sx={{ marginTop: "20px" }}>
          new to the site? <Link to="/register">Register</Link>
        </Typography>
      </Stack>
    </>
  );
}
