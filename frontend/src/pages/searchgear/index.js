import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import serchgearimg from "../../Images/searchgearimg.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  TextField,
  MenuItem,
  Button,
  Slider,
  Typography,
  InputAdornment,
} from "@mui/material";
import { FilterList, LocationOn } from "@mui/icons-material";
import { getApihandler } from "../../Apihandler";
import { Link } from "react-router-dom";
export default function SearchGear() {
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [startdate, setStartDate] = useState("");
  console.log("start", startdate);
  const [enddate, setEndDate] = useState("");
  console.log("enddate", enddate);

  const [category, setCategory] = useState("");
  const [avaialbility, setAvailability] = useState("");
  console.log("avaialbility is --->", avaialbility);
  const categories = [
    "Cameras",
    "Lenses",
    "Drones",
    "Accessories",
    "campinggear",
  ];
  // const availabilityOptions = ["Available Now", "Coming Soon"];
  const [data, setData] = useState([]);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <img src={serchgearimg} />
          </Col>
          <Col md={4}>
            <div
            //   style={{
            //     width: 300,
            //     padding: 20,
            //     background: "#f5f5f5",
            //     borderRadius: 8,
            //   }}
            >
              <TextField
                fullWidth
                placeholder="Search for gear"
                // variant="outlined"
                size="small"
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
              />

              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <FilterList sx={{ mr: 1 }} /> Filters
              </Typography>

              <TextField
                fullWidth
                placeholder="Enter location"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setLocation(e.target.value)}
              />

              <TextField
                select
                fullWidth
                size="small"
               
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Select Category">Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <Typography
                variant="body2"
                sx={{ mb: 1, textAlign: "left", fontWeight: "400" }}
              >
                Price Range
              </Typography>
              <Row>
                <Col md={6}>
                  <TextField
                    type="number"
                    fullWidth
                    size="small"
                     placeholder="Min"
                    sx={{ "& fieldset": { border: "none" } }}
                    style={{
                      backgroundColor: "#D9D9D9A1",
                      outline: "none",
                      marginBottom: "20px",
                      borderRadius: "10px",
                    }}
                    onChange={(e) => setMinPrice(e.target.value)}
                  ></TextField>
                </Col>
                <Col md={6}>
                  <TextField
                    type="number"
                    fullWidth
                    size="small"
                    placeholder="Max"
                    sx={{ "& fieldset": { border: "none" } }}
                    style={{
                      backgroundColor: "#D9D9D9A1",
                      outline: "none",
                      marginBottom: "20px",
                      borderRadius: "10px",
                    }}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  ></TextField>
                </Col>
              </Row>
              {/* <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                defaultValue=""
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <MenuItem value="">Availability</MenuItem>
                {availabilityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField> */}
              <TextField
                type="date"
                fullWidth
                placeholder="Enter rental duration"
                variant="outlined"
                size="small"
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setAvailability(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Brand"
                variant="outlined"
                size="small"
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                type="date"
                fullWidth
                placeholder="Enter rental duration"
                variant="outlined"
                size="small"
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                type="date"
                fullWidth
                placeholder="Enter rental duration"
                variant="outlined"
                size="small"
                sx={{ "& fieldset": { border: "none" } }}
                style={{
                  backgroundColor: "#D9D9D9A1",
                  outline: "none",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Link
                to={`/resultpage/${minprice}/${maxprice}/${location}/${brand}/${startdate}/${enddate}/${category}/${avaialbility}`}
              >
                <Button
                  sx={{
                    backgroundColor: "#10B1D1",
                    color: "white",
                    borderRadius: "10px",
                    paddingX: "40px",
                  }}
                  // onClick={getSearchGear}
                >
                  Search
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
