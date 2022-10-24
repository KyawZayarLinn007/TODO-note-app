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

export default function Register({ setUser }) {
  let navigate = useNavigate();

  //serverError state
  let [serverError, setServerError] = React.useState("");

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

  const handleRegister = (values) => {
    console.log(
      `The email is ${values.email}, the password is ${values.password} and the cpassword is ${values.confirmPassword}`
    );
    axios
      .post(`${process.env.REACT_APP_SERVER_URI}/register`, {
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      })
      .then((response) => {
        if (!response.data.error) {
          let decodedToken = decodeToken(Cookies.get("token"));
          setUser(decodedToken);
          setServerError("");
          navigate("/");
        } else {
          throw new Error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(error.message);
        navigate("/register");
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required!";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = "Invalid email address!"
  }

    if (!values.password) {
      errors.password = "Required!";
    }else if(values.password.length < 3){
      errors.password = "Password must be at least 3 characters!"
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required!";
    }

    return errors;
  };

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: handleRegister,
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
        <Typography variant="h5">Registration</Typography>
      </Stack>

      {/* form div */}
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <div>
            <Typography variant="body2" className="formik_error">{ serverError }</Typography>
            {/* email */}
            <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setServerError("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.email}
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
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                onChange={(e) => {
                  setServerError("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.password}
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
            {/* password error message */}
            {formik.touched.password && formik.errors.password ? (
              <Typography variant="body2" className="formik_error">
                {formik.errors.password}
              </Typography>
            ) : null}

            {/* confirm password */}
            <FormControl sx={{ m: 1, display: "block" }} variant="outlined">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={cvalues.showPassword ? "text" : "password"}
                onChange={(e) => {
                  setServerError("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {cvalues.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confrim Password"
                fullWidth
              />
            </FormControl>
            {/* confirmPassword error message */}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Typography variant="body2" className="formik_error">
                {formik.errors.confirmPassword}
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
            Register
          </Button>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            already a member? <Link to="/login">Login</Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
}
