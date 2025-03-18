import React, { useState } from "react";
import { Button, Card, Checkbox, Container, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AccountCircle, Email, Lock, VpnKey,Phone ,Business  } from "@mui/icons-material";
import signupimg from "../Images/signup.jpg";
import Header from "../layout/header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { postApihandler } from "../Apihandler";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // console.log("name is --->", name);

  const [email, setEmail] = useState("");
  // console.log("email is --->", email);

  const [password, setPassword] = useState("");
  // console.log("password is --->", password);

  const [confirmpassword, setConfirmPassword] = useState("");
  // console.log("confirmpassword is --->", confirmpassword);
  const [phonenumber, setphonenumber] = useState("");

  const [country_code, setCountryCode] = React.useState();

  const [usertype, setUserType] = useState("");
  console.log("user type is ---->", usertype);
  const userSignup = async (e) => {
    e.preventDefault();
    const data = {
      user_Name: name,
      user_Email: email,
      password: password,
      mobile_no: phonenumber,
      user_type: usertype,
    };
    console.log("signup data is ---->", data);
    const res = await postApihandler("/userSignup", data);
    console.log("signup api response is ----->", res);
    if (res.status === 200) {
      swal("Successfully Signup");
      navigate("/login");
    } else {
      swal("Error", res.error.response.data.message || "An unknown error occurred.", "error");
    }
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // ********* const vendor signup ************
  const [vendorname, setVendorName] = useState("");
  const [vendoremail, setVendorEmail] = useState("");
  const [vendorpassword, setVendorPassword] = useState("");
  const [vendornumber, setVendorNumber] = useState();
  const [vendorCountryCode, setVendorCountryCode] = useState();
  const [companyname, setCompnyName] = useState("");
  const vendorSignup = async (e) => {
    e.preventDefault();
    const data = {
      user_Name: vendorname,
      user_Email: vendoremail,
      company_name: companyname,
      password: vendorpassword,
      mobile_no: vendornumber,
      country_code: vendorCountryCode,
    };
    console.log("data is ---->", data);
    const res = await postApihandler("/vendorSignUp", data);
    console.log("vendor api response is --->", res);
    if (res.status === 200) {
      swal("Successfully Signup");
      navigate("/login");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <div>
      <Header />
      <div style={{ padding: "30px" }}>
        <Grid container spacing={2}>
         
          <Grid item xs={12} md={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      "& .MuiTabs-indicator": { backgroundColor: "#8BB74A" },
                    }}
                  >
                    <Tab label="User" value="1" style={{ color: "#8BB74A" }} />
                    <Tab
                      label="Vendor"
                      value="2"
                      style={{ color: "#8BB74A" }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                <Grid container justifyContent="center" alignItems="center" height="100vh" style={{ background: "#f9f9f9" }}>
  <Box sx={{
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    width: "90%"
  }}>
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign up
        </Typography>
        <form onSubmit={userSignup} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
        <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={usertype}
                  onChange={(e) => setUserType(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="rental">Rental</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
          <TextField
            variant="outlined"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Mobile Number"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Repeat your password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label={<Typography>I agree to all statements in <a href="#" style={{ color: "#1976d2" }}>Terms of service</a></Typography>}
          />
          <Button style={{background:"#8bb74a"}} type="submit" variant="contained" color="primary" fullWidth>
            REGISTER
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={signupimg} alt="Signup" style={{ width: "100%", maxHeight: "300px" }} />
      </Grid>
    </Grid>
  </Box>
</Grid>

                </TabPanel>
                <TabPanel value="2">
                <Grid container justifyContent="center" alignItems="center" height="100vh" style={{ background: "#f9f9f9" }}>
      <Box
        sx={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          width: "90%",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Vendor Sign Up
            </Typography>
            <form onSubmit={vendorSignup} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              
         
              <TextField
                variant="outlined"
                placeholder="Vendor Name"
                value={vendorname}
                onChange={(e) => setVendorName(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Vendor Email"
                value={vendoremail}
                onChange={(e) => setVendorEmail(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="password"
                variant="outlined"
                placeholder="Password"
                value={vendorpassword}
                onChange={(e) => setVendorPassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
             
                  <TextField
                    variant="outlined"
                    placeholder="Mobile Number"
                    value={vendornumber}
                    onChange={(e) => setVendorNumber(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                
              <TextField
                variant="outlined"
                placeholder="Company Name"
                value={companyname}
                onChange={(e) => setCompnyName(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography>
                    I agree to all statements in{" "}
                    <a href="#" style={{ color: "#1976d2" }}>
                      Terms of Service
                    </a>
                  </Typography>
                }
              />
              <Button sx={{background:"#8bb74a"}} type="submit" variant="contained" color="primary" fullWidth>
                REGISTER
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={signupimg}// Replace with your actual image URL or import an image
              alt="Signup"
              style={{ width: "100%", maxHeight: "300px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
