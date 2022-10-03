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
import { Link } from "react-router-dom";

export default function Register() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

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
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
        <Button variant="contained">Register</Button>
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
