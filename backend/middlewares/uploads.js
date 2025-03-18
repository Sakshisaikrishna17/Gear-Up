const path = require('path');
const multer = require('multer');
// const multerS3 = require('multer-s3-v2');
// const fs = require('fs');



// //for aws
// const AWS = require('aws-sdk');
// // var multerS3 = require('multer-s3')

// const s3 = new AWS.S3({

//     accessKeyId: 'AKIA2UC3ESTVCO6VDOUS',
//     secretAccessKey: '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'

    
// });

// //for testing the connection with s3 bucket
// s3.listBuckets(function(err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.Buckets);
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(new Error('Only .png, .jpg, and .jpeg files are allowed!'), false);
      }
    }
  });
  
  module.exports = upload;


// // Configure storage for local file system
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Set the destination folder for uploaded files
//         cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         // Set the filename for uploaded files
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Example: photo-1234567890.jpg
//     }
// });

// // Create a Multer instance for handling file uploads
// const upload = multer({
//     storage: storage, // Use the local storage configuration
//     fileFilter: function (req, file, cb) {
//         // Allow only image files
//         if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//             cb(null, true);
//         } else {
//             cb(new Error('Only .png, .jpg, and .jpeg files are allowed!'), false);
//         }
//     }
// });

// // Export the Multer instance
// module.exports = upload;
