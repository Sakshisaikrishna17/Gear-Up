import React, { useState } from "react";
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Header from "../layout/header";
import { postApihandler } from "../Apihandler";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {  Email, Lock  } from "@mui/icons-material";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vendoremail, setVendorEmail] = useState("");
  const [vendorpassword, setVendorPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    console.log("login data is --->", data);
    const res = await postApihandler("/userLogin", data);
    console.log("login api response is ------->", res);
    if (res.status === 200) {
      localStorage.setItem("data", JSON.stringify(res.data));
      swal(" Login Successfully");
      navigate("/searchgear");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };

  // ********* vendor login ************
  const [value, setValue] = React.useState("1");

  const handleChange = (event , newValue) => {
    setValue(newValue);
  };

  const vendorLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: vendoremail,
      password: vendorpassword,
    };
    console.log("login data is --->", data);
    const res = await postApihandler("/vendorLogin", data);
    localStorage.setItem("data", JSON.stringify(res.data));

    console.log("login api response is ------->", res);
    if (res.status === 200) {
      swal(" Login Successfully");
      navigate("/addlisting");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <div>
      <Header />
      <div style={{ padding: "30px" }}>
        <Grid container >
        
          <Grid item xs={12} md={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="User" value="1" />
                    <Tab label="Vendor" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                <Grid container justifyContent="center" alignItems="center" height="50vh" style={{ background: "#f9f9f9" }}>
      <Box
        sx={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={userLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
          <Button style={{ background: "#8bb74a" }} type="submit" variant="contained" color="primary" fullWidth>
            LOGIN
          </Button>
        </form>
      </Box>
    </Grid>
                </TabPanel>
                <TabPanel value="2">
                <Grid container justifyContent="center" alignItems="center" height="50vh" style={{ background: "#f9f9f9" }}>
      <Box
        sx={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Vendor Login
        </Typography>
        <form onSubmit={vendorLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
            placeholder="Vendor Password"
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
          <Button style={{ background: "#8bb74a" }} type="submit" variant="contained" color="primary" fullWidth>
            LOGIN
          </Button>
        </form>
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
