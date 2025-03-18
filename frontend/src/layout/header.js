import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  console.log("userData",userData);
  
  useEffect(() => {
    // Get data from localStorage
    const storedUser = localStorage.getItem("data");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const logout = async()=>{
    localStorage.removeItem("data");
    navigate("/");
  }
  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#8BB74A", color: "black", boxShadow: "none",paddingTop:"10px", paddingBottom:"10px"}}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{fontWeight:"700",color:"white",marginLeft:"20px"}}>Gear Up</Typography>
          <Box className="Header_tab" >
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
              
                padding:"30px"
              }}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding:"30px"

              }}
            >
              About Us
            </a>
           
           
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding:"30px"

              }}
            >
              Contact
            </a>
          </Box>
          <Box sx={{marginRight:"20px"}}>
            {
              userData !== null ? <h5 onClick={logout}>Logout</h5> :
              <>
               <a href="/login" style={{textDecoration:"none"}}>
            <Button variant="outlined" sx={{ marginRight: 1 , borderRadius:"8px", border:"1px solid white", color:"white", fontWeight:"500"}}>
              Login
            </Button>
            </a>&nbsp;&nbsp;
            <a href="/" style={{textDecoration:"none"}}>
            <Button variant="contained" sx={{backgroundColor:"white", borderRadius:"8px",color:"#8BB74A"}}>
              Sign Up
            </Button>
            </a>
              </>
            }
           
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
