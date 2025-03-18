import React from "react";
import Header from "../../layout/header";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Typography } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeImg from "../../Images/Qr Code.png"
export default function PickupReturn() {
  return (
    <>
      <Header />
      <Container
        className="mt-4"
        style={{ maxWidth: "400px", textAlign: "left", marginTop: "20px" }}
      >
        <Typography variant="h5" fontWeight="bold">
          Gear Pickup & Return
        </Typography>

        {/* Pickup Location & Time */}
        <Row className="mt-3">
          <Col>
            <Card className="p-3 shadow-sm bg-light" style={{border:"none" , borderRadius:"20px"}}>
              <Typography variant="subtitle1" fontWeight="bold">
                Pickup Location & Time
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> 123 Main Street, Cityville
              </Typography>
              <Typography variant="body1">
                <strong>Pickup Time:</strong> 10:00 AM, 1st Feb 2025
              </Typography>
              <Typography variant="body1">
                <strong>QR Code:</strong>
              </Typography>
              {/* <QrCodeIcon fontSize="large" /> */}
              <div>
                <img src={QrCodeImg}/>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Return Details */}
        <Row className="mt-3">
          <Col>
            <Card className="p-3 shadow-sm bg-light" style={{border:"none", borderRadius:"20px", backgroundColor:"#D9D9D945"}}>
              <Typography variant="subtitle1" fontWeight="bold">
                Return Details
              </Typography>
              <Typography variant="body1">
                <strong>Rental Duration:</strong> 3 days
              </Typography>
              <Typography variant="body1">
                <strong>Late Return Alert:</strong> Extra charges may apply for
                returns after 4th Feb 2025
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> Active Rental
              </Typography>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
