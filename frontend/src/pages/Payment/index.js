import React from "react";
import Header from "../../layout/header";
import { Container, Button, Card } from "react-bootstrap";
import { Typography } from "@mui/material";

export default function Payment() {
  return (
    <>
      <Header />
      <Container style={{ maxWidth: 400, padding: 20 }}>
      <Typography variant="h6" fontWeight="bold" fontSize="32px">
        Payment Detail
      </Typography>
      
      <div className="p-3 mt-3" style={{textAlign:"left"}}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize="24px">
          Booking Summary
        </Typography>
        <Typography variant="body2" fontSize="24px">
          <strong>Item:</strong> 4-Person Camping Set
        </Typography>
        <Typography variant="body2" fontSize="24px">
          <strong>Rental Period:</strong> Jan 30, 2025 - Feb 5, 2025
        </Typography>
        
        <Typography variant="subtitle1" fontWeight="bold" className="mt-2" fontSize="24px">
          Cost Breakdown:
        </Typography>
        <ul style={{fontSize:"24px"}}>
          <li>
            <Typography variant="body2" style={{fontSize:"24px"}}>Rental Price: $200/day</Typography>
          </li>
          <li>
            <Typography variant="body2" style={{fontSize:"24px"}}>Service Fee: $50</Typography>
          </li>
          <li>
            <Typography variant="body2" style={{fontSize:"24px"}}>Total: $1,250</Typography>
          </li>
        </ul>
      </div>
      <Typography sx={{fontWeight:"700" , fontSize:"24px" , textAlign:"left"}}>Rental Terms</Typography>
      <Typography variant="body2" className="mt-3" sx={{textAlign:"left", fontSize:"24px"}}>
        By proceeding with this booking, you agree to the terms set by the provider, including rules about occupancy, noise levels, and damages.
      </Typography>
      
      <Button variant="primary" className="mt-3" block style={{fontWeight:"700"}}>
        Proceed
      </Button>
    </Container>
    </>
  );
}
