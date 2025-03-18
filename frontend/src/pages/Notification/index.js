import React, { useState } from "react";
import Header from "../../layout/header";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
export default function Notification() {
  const [message, setMessage] = useState("");
  return (
    <>
      <Header />
      <Container className="mt-4"  style={{ maxWidth: "400px", textAlign: "left", marginTop: "20px" }}>
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h4>
              <strong style={{fontSize:"32px"}}>Notifications & Messaging</strong>
            </h4>
            <IconButton>
              <NotificationsNoneIcon fontSize="30px"/>
            </IconButton>
          </Col>
        </Row>

        {/* Push Notifications */}
        <Row className="mt-3">
          <Col>
            <Card className="p-3 shadow-sm" style={{backgroundColor:"#D9D9D952" , borderRadius:"20px", border:"none"}}>
              <h6>
                <strong>Push Notifications</strong>
              </h6>
              <ul className="mb-0">
                <li>New rental request from Alex</li>
                <li>Gear return deadline approaching: 2 days left</li>
                <li>Payment confirmation for booking #12345</li>
                <li>Gear successfully returned - Booking #54321</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Live Chat */}
        <Row className="mt-3">
          <Col>
            <Card className="p-3 shadow-sm" style={{backgroundColor:"#D9D9D952" , borderRadius:"20px", border:"none"}}>
              <h6>
                <strong>Live Chat</strong>
              </h6>
              <p className="mb-1">Hi, can you confirm the pickup time?</p>
              <p className="mb-3">
                Sure, it’s scheduled for 10:00 AM tomorrow.
              </p>

              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Card>
          </Col>
        </Row>

        {/* Send Button */}
        <Row className="mt-3">
          <Col className="text-center">
            <Button variant="outline-dark" size="lg" style={{padding:"5px 30px"}}>
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
