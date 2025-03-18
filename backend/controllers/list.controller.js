// issue.controller.js
const List = require('../models/list.model');
// const user = require('../models/user.model');
const vendor = require('../models/vendor.model');


// exports.createList = async (req, res) => {
//   try {
//     // const { vendor_id, title, category, description, pricing, availability } = req.body;
//     // const { vendor_id, title, category, description, pricing, availability, location, brand, rentalPeriod } = req.body;
//     const { vendor_id, title, category, description, pricing, availability, location, brand } = req.body;
//     const rentalPeriodParsed = req.body.rentalPeriod ? JSON.parse(req.body.rentalPeriod) : null;

//     const photoUrl = req.file ? req.file.path : null; // Get the path of the uploaded image

//     // Validate required fields
//     // if (!vendor_id || !title || !category || !description || !pricing || !availability || !photoUrl) {
//       if (!vendor_id || !title || !category || !description || !pricing || !availability || !photoUrl || !location || !brand || !rentalPeriod) {
//       return res.status(400).send({ message: 'All fields are required', status: 400 });
//     }

//     // Create a new listing
//     const newListing = await List.create({
//       vendor_id,
//       title,
//       category,
//       description,
//       pricing,
//       availability,
//       location,
//       brand,
//       // rentalPeriod,
//       rentalPeriod: rentalPeriodParsed, // Parsed rentalPeriod
//       photoUrl // Store the single image path
//     });

//     return res.status(200).send({
//       data: newListing,
//       message: 'Listing created successfully',
//       status: 200
//     });
//   } catch (error) {
//     console.error("Error in createList:", error);
//     return res.status(500).send({ message: error.message, status: 500 });
//   }
// };

exports.createList = async (req, res) => {
  try {
    // Extract form-data values
    const { vendor_id, title, category, description, pricing, availability, location, brand } = req.body;
    
    // Parse rentalPeriod safely
    let rentalPeriodParsed = null;
    if (req.body.rentalPeriod) {
      try {
        rentalPeriodParsed = JSON.parse(req.body.rentalPeriod);
      } catch (error) {
        return res.status(400).send({ message: "Invalid rentalPeriod format", status: 400 });
      }
    }

    const photoUrl = req.file ? req.file.path : null; // Get the uploaded image path

    // Validate required fields
    if (!vendor_id || !title || !category || !description || !pricing || !availability || !photoUrl || !location || !brand || !rentalPeriodParsed) {
      return res.status(400).send({ message: 'All fields are required, including rentalPeriod', status: 400 });
    }

    // Create a new listing
    const newListing = await List.create({
      vendor_id,
      title,
      category,
      description,
      pricing,
      availability,
      location,
      brand,
      rentalPeriod: rentalPeriodParsed, // Parsed rentalPeriod
      photoUrl // Store the single image path
    });

    return res.status(200).send({
      data: newListing,
      message: 'Listing created successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in createList:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};





// exports.searchListings = async (req, res) => {
//   try {
//     // const { location, category, minPrice, maxPrice, availability, brand, rentalDuration } = req.query;
//     // const { category, minPrice, maxPrice, availability } = req.query;
//     const { category, minPrice, maxPrice, availability, location, brand, rentalStartDate, rentalEndDate } = req.query;


//     // Build the filter object based on the provided query parameters
//     const filter = {};

//     if (location) {
//       filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
//     }

//     if (category) {
//       filter.category = { $regex: category, $options: 'i' }; // Case-insensitive search
//     }

//     if (minPrice || maxPrice) {
//       filter.pricing = {};
//       if (minPrice) filter.pricing.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
//       if (maxPrice) filter.pricing.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
//     }

//     // if (availability) {
//     //   filter.availability = availability;
//     // }

//     if (availability) {
//       filter.availability = new Date(availability);
//     }

//     if (brand) {
//       filter.brand = { $regex: brand, $options: 'i' }; // Case-insensitive search
//     }

//     // if (rentalDuration) {
//     //   filter.rentalDuration = { $gte: parseInt(rentalDuration) }; // Greater than or equal to rentalDuration
//     // }


//     // Filter rentalPeriod by startDate and endDate
//     if (rentalStartDate || rentalEndDate) {
//       filter["rentalPeriod.startDate"] = rentalStartDate ? { $gte: new Date(rentalStartDate) } : undefined;
//       filter["rentalPeriod.endDate"] = rentalEndDate ? { $lte: new Date(rentalEndDate) } : undefined;
//     }

//     // Remove undefined values from filter
//     Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);


//     // Fetch listings based on the filter
//     const listings = await List.find(filter);

//     return res.status(200).send({
//       data: listings,
//       message: 'Listings fetched successfully',
//       status: 200
//     });
//   } catch (error) {
//     console.error("Error in searchListings:", error);
//     return res.status(500).send({ message: error.message, status: 500 });
//   }
// };





// exports.searchListings = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, availability, location, brand, rentalStartDate, rentalEndDate } = req.query;

//     const filter = {};

//     if (category) {
//       filter.category = { $regex: category, $options: "i" };
//     }

//     if (location) {
//       filter.location = { $regex: location, $options: "i" };
//     }

//     if (brand) {
//       filter.brand = { $regex: brand, $options: "i" };
//     }

//     if (minPrice || maxPrice) {
//       filter.pricing = {};
//       if (minPrice) filter.pricing.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.pricing.$lte = parseFloat(maxPrice);
//     }

//     if (availability) {
//       filter.availability = new Date(availability);
//     }

//     // ✅ Fix Rental Period Filtering
//     if (rentalStartDate || rentalEndDate) {
//       filter["rentalPeriod.startDate"] = rentalStartDate ? { $lte: new Date(rentalStartDate) } : undefined;
//       filter["rentalPeriod.endDate"] = rentalEndDate ? { $gte: new Date(rentalEndDate) } : undefined;
//     }

//     // Remove undefined filters
//     Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);

//     // 🟢 Debugging: Log the filter being applied
//     // console.log("🔍 Applied Filter:", JSON.stringify(filter, null, 2));

//     const listings = await List.find(filter);

//     // 🟢 Debugging: Log retrieved listings
//     // console.log("📜 Found Listings:", listings);

//     return res.status(200).send({
//       data: listings,
//       message: "Listings fetched successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("❌ Error in searchListings:", error);
//     return res.status(500).send({ message: error.message, status: 500 });
//   }
// };

exports.searchListings = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, availability, location, brand, rentalStartDate, rentalEndDate } = req.query;

    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }

    // ✅ Fix minPrice & maxPrice filtering
    if (minPrice || maxPrice) {
      filter.pricing = {};
      if (minPrice) filter.pricing.$gte = Number(minPrice);  // Ensure proper conversion to Number
      if (maxPrice) filter.pricing.$lte = Number(maxPrice);
    }

    if (availability) {
      filter.availability = new Date(availability);
    }

    // ✅ Fix Rental Period Filtering
    if (rentalStartDate || rentalEndDate) {
      filter["rentalPeriod.startDate"] = rentalStartDate ? { $lte: new Date(rentalStartDate) } : undefined;
      filter["rentalPeriod.endDate"] = rentalEndDate ? { $gte: new Date(rentalEndDate) } : undefined;
    }

    // Remove undefined filters
    Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);

    // 🟢 Debugging: Log the filter being applied
    // console.log("🔍 Applied Filter:", JSON.stringify(filter, null, 2));

    const listings = await List.find(filter);

    // 🟢 Debugging: Log retrieved listings
    // console.log("📜 Found Listings:", listings);

    return res.status(200).send({
      data: listings,
      message: "Listings fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error in searchListings:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};








