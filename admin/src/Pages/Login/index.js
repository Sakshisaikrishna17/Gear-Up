/** @format */

import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { Grid, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { postApihandler } from "../../Apihandler";
import { Email, Lock } from "@mui/icons-material"; // Material-UI icons

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const SubmitLogins = async (value) => {
    let result = await postApihandler("/adminLogin", value);
    if (result.status === 200) {
      navigate("/dashboard");
      swal({ icon: "success", text: "You have successfully logged in" });
    } else {
      swal({ icon: "error", title: "Please Try Again", text: result.error?.response?.data?.message });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh" sx={{ background: "#121212" }}>
      <Box sx={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", maxWidth: "400px", width: "90%", textAlign: "center", color: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: "#8BB74A" }}>Admin Login</Typography>
        <Form onSubmit={handleSubmit(SubmitLogins)}>
          {/* Email Field */}
          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text style={{ background: "transparent", border: "1px solid #8BB74A", color: "#8BB74A" }}>
                <Email />
              </InputGroup.Text>
              <Form.Control type="email" placeholder="Enter Email" {...register("admin_Email")} required style={{ background: "transparent", color: "#fff", border: "1px solid #8BB74A" }} />
            </InputGroup>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-4">
            <InputGroup>
              <InputGroup.Text style={{ background: "transparent", border: "1px solid #8BB74A", color: "#8BB74A" }}>
                <Lock />
              </InputGroup.Text>
              <Form.Control type="password" placeholder="Enter Password" {...register("password")} required style={{ background: "transparent", color: "#fff", border: "1px solid #8BB74A" }} />
            </InputGroup>
          </Form.Group>

          {/* Login Button */}
          <Button type="submit" variant="contained" style={{ background: "#8BB74A", color: "#121212", padding: "10px 0", width: "100%", fontWeight: "bold", borderRadius: "8px", transition: "0.3s" }}>
            Login
          </Button>
        </Form>
      </Box>
    </Grid>
  );
};

export default Login;
