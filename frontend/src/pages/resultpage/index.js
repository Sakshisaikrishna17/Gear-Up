import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import { Container, Card, Button } from "react-bootstrap";
import {
  TextField,
  MenuItem,
  Slider,
  Typography,
  InputAdornment,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { getApihandler } from "../../Apihandler";
import { useParams } from "react-router-dom";
export default function ResultPage() {
  const [price, setPrice] = useState(500);
  const categories = ["All", "Cameras", "Camping Gear", "Accessories"];
  const gearItems = [
    {
      title: "Professional DSLR Camera Kit",
      subtitle: "4-Person Camping Set",
      location: "San Francisco, CA",
      price: 75,
    },
    {
      title: "Camping stoves and cookware",
      location: "Portland, OR",
      price: 200,
    },
    { title: "", location: "Austin, TX", price: 60 },
  ];
  const [data, setData] = useState([]);
  console.log("data is ---->", data);
  const {
    minprice,
    maxprice,
    location,
    brand,
    startdate,
    enddate,
    category,
    avaialbility,
  } = useParams();
  useEffect(() => {
    getSearchGear();
  }, []);
  const getSearchGear = async () => {
    const res = await getApihandler(
      `/searchListings?category=${category}&minPrice=${minprice}&maxPrice=${maxprice}&location=${location}&brand=${brand}&rentalStartDate=${startdate}&rentalEndDate=${enddate}&availability=${avaialbility}`
    );
    console.log("search api response is --->", res);
    if (res.message === "Listings fetched successfully") {
      setData(res.data);
    }
  };
  return (
    <>
      <Header />
      <Container style={{ width: 350, padding: 20 }}>
        <TextField
          fullWidth
          placeholder="Search for gear"
          variant="outlined"
          size="small"
          sx={{ mb: 2, "& fieldset": { border: "none" } }}
          style={{
            backgroundColor: "#D9D9D9A1",
            outline: "none",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <TextField
            fullWidth
            placeholder="Enter location"
            variant="outlined"
            size="small"
            sx={{ "& fieldset": { border: "none" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: "#D9D9D9A1",
              outline: "none",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          />

          <TextField
            select
            fullWidth
            size="small"
            variant="outlined"
            sx={{ "& fieldset": { border: "none" } }}
            defaultValue="All"
            style={{
              backgroundColor: "#D9D9D9A1",
              outline: "none",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <Typography
            variant="body2"
            sx={{ mb: 1, fontWeight: "700", color: "#000000B8" }}
          >
            Price Range:
          </Typography>
          <Slider
            value={price}
            onChange={(e, newValue) => setPrice(newValue)}
            min={0}
            max={1000}
            sx={{ width: "100%" }}
          />
          <Typography variant="body2">${price}</Typography>
        </div>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Featured Gear
        </Typography>
        <Button
          variant="primary"
          style={{
            marginBottom: 15,
            backgroundColor: "#007AFF",
            fontWeight: "700",
          }}
        >
          List your gear
        </Button>

        {data.map((item, index) => (
          <Card
            key={index}
            style={{ marginBottom: 10, padding: 10, borderRadius: 10 }}
          >
            {item.title && (
              <Card.Title style={{ fontSize: 20, fontWeight: "700" }}>
                {item.title}
              </Card.Title>
            )}
            <Card.Text
              style={{ fontSize: 14, color: "#00000091", fontWeight: "700" }}
            >
              {item.description}
            </Card.Text>
            <Card.Text
              style={{ fontSize: 14, color: "#00000091", fontWeight: "700" }}
            >
              {item.brand}
            </Card.Text>
            {item.category && (
              <Card.Text style={{ fontSize: 20, fontWeight: "700" }}>
                {item.category}
              </Card.Text>
            )}
            <Card.Text
              style={{ fontSize: 20, color: "#00000091", fontWeight: "700" }}
            >
              {item.location}
            </Card.Text>
            {/* <Card.Text
              style={{ fontSize: 20, color: "#00000091", fontWeight: "700" }}
            >
              {item.rentalPeriod.startDate}
            </Card.Text>
            <Card.Text
              style={{ fontSize: 20, color: "#00000091", fontWeight: "700" }}
            >
              {item.rentalPeriod.endDate}
            </Card.Text> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                ${item.pricing}/day
              </Typography>
              <Button
                variant="secondary"
                size="sm"
                style={{
                  background: "#D9D9D9",
                  color: "black",
                  border: "none",
                  fontWeight: "700",
                }}
              >
                Rent Now
              </Button>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}
