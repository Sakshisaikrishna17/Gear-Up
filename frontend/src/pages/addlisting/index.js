import React, { useState } from "react";
import Header from "../../layout/header";
import { Container, Button, Form } from "react-bootstrap";
import { TextField, MenuItem, IconButton } from "@mui/material";
import {
  Visibility,
  CalendarToday,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const addListing = async () => {
    const vendorData = JSON.parse(localStorage.getItem("data"));
    const vendorId = vendorData._id;
    console.log("vendor id is ", vendorId);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("pricing", pricing);
    formData.append("availability", availability);
    formData.append("vendor_id", vendorId);
    if (imageFile) {
      formData.append("photoUrl", imageFile);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const res = await postApihandler("/createList", formData);
    console.log("Add listing API response:", res);
    if (res.message === "Listing created successfully") {
      swal({
        text: "Listing created succenssfully",
        icon: "success",
      });
    }
  };

  return (
    <>
      <Header />
      <Container style={{ maxWidth: 400, padding: 20 }}>
        <h6 style={{ fontWeight: "500", fontSize: "24px", textAlign: "left" }}>
          Basic Information
        </h6>
        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <Button
            variant="light"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: "1px solid #00000033",
              fontSize: "20px",
            }}
          >
            <Visibility /> Preview
          </Button>
          <Button
            variant="primary"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            + Publish Listing
          </Button>
        </div>

        {/* Title */}
        <h6 style={{ fontWeight: "400", fontSize: "20px", textAlign: "left" }}>
          Title
        </h6>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          size="small"
          sx={{ mb: 2, background: "#D9D9D929", borderRadius: "10px" }}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category */}
        <h6 style={{ fontWeight: "400", fontSize: "20px", textAlign: "left" }}>
          Category
        </h6>
        <TextField
          fullWidth
          select
          label="Category"
          variant="outlined"
          size="small"
          sx={{ mb: 2, background: "#D9D9D929", borderRadius: "10px" }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Camera">Camera</MenuItem>
          <MenuItem value="Camping">Camping Gear</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
        </TextField>

        {/* Description */}
        <h6 style={{ fontWeight: "400", fontSize: "20px", textAlign: "left" }}>
          Description
        </h6>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2, background: "#D9D9D929", borderRadius: "10px" }}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Image Upload */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <Form.Label>Images</Form.Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <IconButton component="span">
              <AddPhotoAlternate /> Add Image
            </IconButton>
          </label>

          {/* Image Preview */}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
          )}
        </div>

        {/* Pricing */}
        <TextField
          fullWidth
          placeholder="Pricing"
          variant="outlined"
          size="small"
          sx={{ mb: 2, background: "#D9D9D929", borderRadius: "10px" }}
          onChange={(e) => setPricing(e.target.value)}
        />

        {/* Availability */}
        <TextField
          type="date"
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2, background: "#D9D9D929", borderRadius: "10px" }}
          onChange={(e) => setAvailability(e.target.value)}
          // InputProps={{
          //   endAdornment: (
          //     <IconButton>
          //       <CalendarToday />
          //     </IconButton>
          //   ),
          // }}
        />

        {/* Submit Button */}
        <Button variant="primary" className="mt-3" onClick={addListing}>
          Add Listing
        </Button>
      </Container>
    </>
  );
}
