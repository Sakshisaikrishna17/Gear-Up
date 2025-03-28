import React from "react";
import Header from "../../layout/header";
import { Container } from "react-bootstrap";
import { Box, Button, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <Container
        style={{ maxWidth: "400px", textAlign: "left", marginTop: "20px" }}
      >
        <Typography variant="h5" fontWeight="700" textAlign="left">
          Dashboard
        </Typography>
        <div className="mt-3">
          <Button
            sx={{
              backgroundColor: "#D9D9D959",
              color: "black",
              fontWeight: "700",
              padding: "5px 40px",
              borderRadius: "10px",
            }}
          >
            Renters{" "}
          </Button>
        </div>
        <div>
          <Button
            className="mt-3"
            sx={{
              backgroundColor: "#D9D9D959",
              color: "black",
              fontWeight: "700",
              padding: "5px 30px",
              borderRadius: "10px",
            }}
          >
            Providers
          </Button>
        </div>
        <Typography variant="h5" fontWeight="700" className="mt-3">
          Your Rentals
        </Typography>
        <Box
          sx={{
            backgroundColor: "#D9D9D929",
            borderRadius: "20px",
            marginTop: "20px",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            color="#000000"
            fontWeight="700"
            className="mb-3"
          >
            Booking Management
          </Typography>

          <div>
            <Button
              sx={{
                backgroundColor: "#D9D9D959",
                color: "black",
                fontWeight: "700",
                padding: "5px 40px",
                borderRadius: "10px",
              }}
            >
              Accept
            </Button>
          </div>
          <div className="mt-3">
            <Button
              sx={{
                backgroundColor: "#D9D9D959",
                color: "black",
                fontWeight: "700",
                padding: "5px 40px",
                borderRadius: "10px",
              }}
            >
              Reject
            </Button>
          </div>
        </Box>
        <div className="mt-4">
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            Order Tracking
          </Typography>
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            Upcoming Orders: 2
          </Typography>
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            Active Orders: 1
          </Typography>
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            Completed Orders: 3
          </Typography>
          <div className="d-flex justify-content-between mt-3">
            <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
              Request Support
            </Typography>
            <Button
              sx={{
                backgroundColor: "#D9D9D9",
                borderRadius: "10px",
                color: "black",
                fontWeight: "700",
                textTransform: "Capitalize",
              }}
            >
              Request Support
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
