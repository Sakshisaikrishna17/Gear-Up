import React from "react";
import Header from "../../layout/header";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Container } from "react-bootstrap";

export default function SecurePayment() {
  return (
    <>
      <Header />
      <Container style={{maxWidth: 400 , marginTop:"30px"}}>
      <Typography variant="h4" fontWeight="700">
        Secure Payment
      </Typography>
      <FormGroup style={{marginTop:"10px"}}>
        <FormControlLabel
          control={<Checkbox />}
          label="Credit Card"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
              fontSize: "24px",
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Google Pay"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
              fontSize: "24px",
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Apple Pay"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
              fontSize: "24px",
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="PayPal"
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 700,
              fontSize: "24px",
            },
          }}
        />
      </FormGroup>
      <Button
        sx={{
          fontWeight: "700",
          backgroundColor: "#007AFF",
          color: "white",
          padding: "10px 30px",
          borderRadius: "10px",
        }}
      >
        Pay Now
      </Button>
      <div className="mt-5" style={{textAlign:"left"}}>
        <Typography variant="h6" fontWeight="700" sx={{textAlign:"left"}}>
          Cancellation Policy
        </Typography>
        <Typography variant="p" fontWeight="400" fontSize="24px">
          You can cancel your booking up to 24 hours before the rental period
          starts to receive a full refund. Cancellations within 24 hours of the
          rental period may incur charges.
        </Typography>
      </div>
      </Container>
    </>
  );
}
