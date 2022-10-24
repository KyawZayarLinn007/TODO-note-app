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
import Cookies from "js-cookie";
import { useFormik } from "formik";

export default function Login({ setUser }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`The email is ${email} and password is ${values.password}`);
    console.log(`${process.env.REACT_APP_SERVER_URI}/login`);
    axios
      .post(`${process.env.REACT_APP_SERVER_URI}/login`, {
        email,
        password: values.password,
      })
      .then((response) => {
        console.log(`The response is`);
        console.log(response);

        if (!response.error) {
          //decode jwt token
          let decodedToken = decodeToken(Cookies.get("token"));
          //set user state
          setUser(decodedToken);
          navigate("/");
        } else {
          throw new Error(response.error);
        }
      })
      .catch((err) => {
        console.log(`The error is`);
        console.log(err);
        navigate("/login");
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required!";
    }

    if (!values.password) {
      errors.password = "Required!";
    }

    return errors;
  };

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

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
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <div>
            {/* email */}
            <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                {...formik.getFieldProps("email")}
              />
            </FormControl>
            {/* email error message */}
            {formik.touched.email && formik.errors.email ? (
              <Typography variant="body2" className="formik_error">
                {formik.errors.email}
              </Typography>
            ) : null}

            {/* password */}
            <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                {...formik.getFieldProps("password")}
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
            {/* password error message*/}
            {formik.touched.password && formik.errors.password ? (
              <Typography variant="body2" className="formik_error">
                {formik.errors.password}
              </Typography>
            ) : null}
          </div>
        </Stack>

        {/* Button */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "20px" }}
        >
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            new to the site? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
}
