import React, { useState } from "react";
import Header from "../../layout/header";
import { Checkbox, FormControlLabel, Rating, TextField, Button } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";

export default function Review() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
  return (
    <>
      <Header />
      <Container className="mt-4" style={{maxWidth:"400px" , textAlign:"left"}}>
      <Row>
        <Col>
          <h4><strong>Leave a Review</strong></h4>
          
          <FormControlLabel
            control={<Checkbox />}
            label="Verified Renter"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: 700,
              },
            }}
            labelPlacement="start" 
          />

          <h6 className="mt-3"><strong>Rate Your Experience</strong></h6>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <p>{rating}</p>

          <h5 className="mt-3"><strong>Leave a Comment</strong></h5>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{borderRadius:"10px" , backgroundColor:"#D9D9D938"}}
          />

          <h6 className="mt-3"><strong>Report a Fraudulent Review</strong></h6>

          <div className="mt-3">
            <Button variant="outlined" color="primary" className="me-2" sx={{ color:"black" , borderRadius:"10px", border:"1px solid black", backgroundColor:"#D9D9D938"}}>
              Submit Review
            </Button>
            <Button variant="outlined" sx={{ color:"black" , borderRadius:"10px", border:"1px solid black", backgroundColor:"#D9D9D938"}}>
              Report
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}
