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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";
import Cookies from 'js-cookie';

export default function Register({setUser}) {
  let navigate = useNavigate();

  //email state
  const [email, setEmail] = React.useState("");

  //password state
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  //cofirm password state
  const [cvalues, setCValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirmChange = (prop) => (event) => {
    setCValues({ ...cvalues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setCValues({
      ...cvalues,
      showPassword: !cvalues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = () => {
    console.log(`The email is ${email}, the password is ${values.password} and the cpassword is ${cvalues.password}`);
    axios.post(`${process.env.REACT_APP_SERVER_URI}/register`, {
      email, 
      password: values.password, 
      confirm_password: cvalues.password
    })
    .then(response => {
      if(!response.error){
        let decodedToken = decodeToken(Cookies.get('token'));
        setUser(decodedToken);
        navigate("/");
      }else{
        throw new Error(response.error);
      }
    })
    .catch(error => {
      console.log(error);
      navigate("/register");
    })
  }

  return (
    <>
      {/* heading */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "20px", marginTop: "100px" }}
      >
        <Typography variant="h5">Registration</Typography>
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

          {/* confirm password */}
          <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cpassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-cpassword"
              type={cvalues.showPassword ? "text" : "password"}
              value={cvalues.password}
              onChange={handleConfirmChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {cvalues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confrim Password"
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
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        <Typography
            variant="body1"
            sx={{marginTop: "20px"}}
        >
            already a member? <Link to="/login">Login</Link>
        </Typography>
      </Stack>
    </>
  );
}
