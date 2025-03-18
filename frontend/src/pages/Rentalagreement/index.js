import React from "react";
import Header from "../../layout/header";
import { Button, Typography } from "@mui/material";
import { Container } from "react-bootstrap";

export default function RentalAgreement() {
  return (
    <>
      <Header />
      <Container style={{ maxWidth: "400px", marginTop: "30px" }}>
        <div style={{ textAlign: "left" }}>
          <Typography variant="h4" fontWeight="700" fontSize="32px">
            Rental Agreement
          </Typography>
          <Typography variant="p" fontSize="16px" fontWeight="700">
            {" "}
            Once the provider approves your booking, please review and digitally
            sign the rental agreement below.
          </Typography>
          <Typography
            variant="h5"
            fontSize="24px"
            color="#134B88"
            fontWeight="700"
          >
            Insurance & Liability Terms
          </Typography>
          <Typography variant="h4" fontSize="15px" fontWeight="700">
            By signing this agreement, you acknowledge the following terms:
          </Typography>
          <ul>
            <li style={{ fontSize: "15px", fontWeight: "700" }}>
              You are responsible for the equipment from the moment it is
              delivered/picked up until it is returned.
            </li>
            <li style={{ fontSize: "15px", fontWeight: "700" }}>
              Insurance is included to cover damages during the rental period,
              subject to the terms outlined by the provider.
            </li>
            <li style={{ fontSize: "15px", fontWeight: "700" }}>
              The renter agrees to return the gear in the same condition it was
              received.
            </li>
          </ul>
          <Typography
            variant="h5"
            fontSize="24px"
            color="#134B88"
            fontWeight="700"
          >
            Digital Signature
          </Typography>
          <Typography variant="" fontWeight="700" fontSize="16px">
            Please provide your digital signature below to confirm your
            agreement:
          </Typography>
          <div className="text-center mt-3">
            <Button
              sx={{
                background: "#D9D9D94D",
                border: "2px solid #000000",
                borderStyle: "dashed",
                padding: "10px 30px",
                color: "#000000AB",
                fontWeight: "700",
              }}
            >
              Sign here:
            </Button>
            <div className="mt-3">
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px 30px",
                  fontWeight: "700",
                //   fontSize: "24px",
                }}
              >
                Clear
              </Button>
            </div>
            <Typography variant="h6" fontWeight="700">
              Download Agreement
            </Typography>
            <div className="mt-3">
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px 30px",
                  fontWeight: "700",
                //   fontSize: "24px",
                }}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
