import React from "react";
import {
    Button,
    Card,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import signupimg from "../Images/signup.png";
import Header from "../layout/header";

export default function Signup() {
    return (

        <div>
            <Header />
            <div style={{ padding: "30px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <div className="signupimg">
                            <img src={signupimg} alt="Mechanic" style={{ width: "100%" }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>

                        <form
                            component="form"
                            style={{ display: "flex", alignItems: "center",marginTop:"30px", flexDirection: "column", gap: 2, textAlign: "center" }}
                        >
                            <div style={{ width: "60%" }}>
                                <div >

                                    <Typography sx={{ textAlign: "start", fontSize: "20px" }}>Name</Typography>
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        fullWidth
                                        style={{
                                            background: "#D9D9D929",
                                            border: "2px solid #0000006E",
                                            width: "272px",
                                            height: "40px",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            marginBottom: "30px",
                                            paddingLeft: "10px"
                                        }}
                                    />
                                </div>
                                <div >

                                    <Typography sx={{ textAlign: "start", fontSize: "20px" }}>Email</Typography>
                                    <input
                                        type="text"
                                        placeholder="Enter your Email"
                                        fullWidth
                                        style={{
                                            background: "#D9D9D929",
                                            border: "2px solid #0000006E",
                                            width: "272px",
                                            height: "40px",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            marginBottom: "30px",
                                            paddingLeft: "10px"
                                        }}
                                    />
                                </div>
                                <div >

                                    <Typography sx={{ textAlign: "start", fontSize: "20px" }}>Password</Typography>
                                    <input
                                        type="text"
                                        placeholder="Enter your password"
                                        fullWidth
                                        style={{
                                            background: "#D9D9D929",
                                            border: "2px solid #0000006E",
                                            width: "272px",
                                            height: "40px",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            marginBottom: "30px",
                                            paddingLeft: "10px"
                                        }}
                                    />
                                </div>
                                <div >

                                    <Typography sx={{ textAlign: "start", fontSize: "20px" }}>User Type</Typography>
                                    <select
                                        fullWidth
                                        style={{
                                            background: "#D9D9D929",
                                            border: "2px solid #0000006E",
                                            width: "285px",
                                            height: "45px",
                                            borderRadius: "10px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            marginBottom: "30px",
                                            paddingLeft: "10px"
                                        }}
                                    >
                                        
                                        <option value="option1">Rental</option>
                                        <option value="option2">Custom</option>
                                        
                                    </select>

                                    
                                </div>
                               
                            </div>

                            <div style={{}}>
                                    <Button variant="contained" sx={{ backgroundColor: "#10B1D1" ,width: "240px",borderRadius:"20px",fontSize:"16px"}}>
                                        Sign Up
                                    </Button>
                                </div>
                                <Typography
                                    variant="body2"
                                    textAlign="start"
                                    sx={{
                                        
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginTop: "20px",
                                    }}
                                >
                                    Already have an account?{" "}
                                    <a href="/login" style={{ textDecoration: "none" }}>
                                        Log in
                                    </a>
                                </Typography>
                        </form>

                    </Grid>
                </Grid>
            </div>


        </div>
    );
}
