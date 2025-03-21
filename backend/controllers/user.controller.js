const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const user = require('../models/user.model');
const vendor = require('../models/vendor.model');

function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}


exports.userSignUp = async (req, res) => {
    let user_Email = req.body.user_Email ? req.body.user_Email : "";
    let user_Name = req.body.user_Name ? req.body.user_Name : "";
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let user_type = req.body.user_type ? req.body.user_type : "";
    let password = req.body.password ? req.body.password : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      
      if (!user_Email) {
        return res.status(400).send({ message: "Email is required", status: 400 });
      } 
      if (!user_Email.match(mailformat)) {
        return res.status(400).send({ message: "Email is not in correct format", status: 400 });
      } 
      if (!user_Name) {
        return res.status(400).send({ message: "Full name is required", status: 400 });
      } 
    
      if (!mobile_no) {
        return res.status(400).send({ message: "Mobile Number is required", status: 400 });
      } 
      if (mobile_no.length < 7) {
        return res.status(400).send({ message: "Mobile number cannot be less than 7 digits.", status: 400 });
      } 
      if (mobile_no.length > 15) {
        return res.status(400).send({ message: "Mobile number cannot be more than 15 digits long.", status: 400 });
      } 
      if (isNaN(mobile_no)) {
        return res.status(400).send({ message: "Mobile number must only contain digits", status: 400 });
      } 
      if (!password) {
        return res.status(400).send({ message: "Password is required", status: 400 });
      } 
      if (password.length < 8 || !password.match(passformat)) {
        return res.status(400).send({ 
          message: "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, a number, and a symbol.", 
          status: 400 
        });
      } 
      if (!user_type) {
        return res.status(400).send({ message: "User type is required", status: 400 });
      }
  
      let checkEmail = await user.find({ user_Email: user_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await user.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await user.create({
        user_Email: user_Email,
        user_Name: user_Name,
        user_type: user_type,
        mobile_no: mobile_no,
        password: bcrypt.hashSync(password, 8),
       
      });
  
      return res
        .status(200)
        .send({ data: data, message: "Success", status: 200 });
    } catch (error) {
      return res
        .status(500)
        .send({  message: error.message, status: 500 });
    }
  };

exports.userLogin = async (req, res) => {
    try {
        const user_Email = (req.body.user_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!user_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const userData = await user.findOne({ "user_Email": user_Email, deleteFlag: false });

        if (!userData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(userData._id);
        return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error.', status: 500 });
    }
};


exports.changeUserPassword = async (req, res) => {
    try {
        const usersRegId = req.params.usersRegId;
        const oldPassword = req.body.oldPassword || '';
        const newPassword = req.body.newPassword || '';
        const confirmPassword = req.body.confirmPassword || '';
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;


        // Validate request data
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({ message: 'All password fields must be provided', status: 400 });
        } else {
            if (!newPassword.match(passwordRegex)) {
                return res.status(400).send({ message: "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)", status: 400 });
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).send({ message: 'New password and confirm password do not match', status: 401 });
        }

        const existingUser = await user.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await user.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};

exports.vendorSignUp = async (req, res) => {
  let user_Email = req.body.user_Email ? req.body.user_Email : "";
  let user_Name = req.body.user_Name ? req.body.user_Name : "";
  let company_name = req.body.company_name ? req.body.company_name : "";
  let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
  let password = req.body.password ? req.body.password : "";
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

  try {
    if (!user_Email) {
      return res.status(400).send({ message: "Email is required", status: 400 });
    }
    if (!user_Email.match(mailformat)) {
      return res.status(400).send({ message: "Email is not in correct format", status: 400 });
    }
    if (!user_Name) {
      return res.status(400).send({ message: "Full name is required", status: 400 });
    }
    if (!company_name) {
      return res.status(400).send({ message: "Company name is required", status: 400 });
    }
    if (!mobile_no) {
      return res.status(400).send({ message: "Mobile Number is required", status: 400 });
    }
    if (mobile_no.length < 7) {
      return res.status(400).send({ message: "Mobile number cannot be less than 7 digits.", status: 400 });
    }
    if (mobile_no.length > 15) {
      return res.status(400).send({ message: "Mobile number cannot be more than 15 digits long.", status: 400 });
    }
    if (isNaN(mobile_no)) {
      return res.status(400).send({ message: "Mobile number must only contain digits", status: 400 });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required", status: 400 });
    }
    if (password.length < 8 || !password.match(passformat)) {
      return res.status(400).send({
        message:
          "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, a number, and a symbol.",
        status: 400,
      });
    }

    let checkEmail = await vendor.find({ user_Email: user_Email }).lean();
    if (checkEmail.length > 0) {
      return res.status(409).send({ message: "Email already exists", status: 409 });
    }

    let checkMobileNo = await vendor.find({ mobile_no: mobile_no }).lean();
    if (checkMobileNo.length > 0) {
      return res.status(409).send({ message: "Mobile number already exists", status: 409 });
    }

    let data = await vendor.create({
      user_Email: user_Email,
      user_Name: user_Name,
      company_name: company_name,
      mobile_no: mobile_no,
      password: bcrypt.hashSync(password, 8),
    });

    return res.status(200).send({ data: data, message: "Success", status: 200 });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: 500 });
  }
};


exports.vendorLogin = async (req, res) => {
  try {
      const user_Email = (req.body.user_Email || '').toLowerCase();
      const password = req.body.password || '';

      // Validation
      if (!user_Email || !password) {
          return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
      }

      const userData = await vendor.findOne({ "user_Email": user_Email, deleteFlag: false });

      if (!userData) {
          return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
      }

      const passwordIsValid = bcrypt.compareSync(password, userData.password);
      if (!passwordIsValid) {
          return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
      }

      const token = generateToken(userData._id);
      return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
  } catch (error) {
      return res.status(500).send({ message: 'Internal server error.', status: 500 });
  }
};


// Edit vendor data by admin
exports.editVendor = async (req, res) => {
  try {
      const vendorId = req.params.vendorId;
      const { user_Name, company_name, mobile_no  } = req.body;

      // Validate request data
      if (!user_Name || !company_name || !mobile_no ) {
          return res.status(400).send({ message: 'All fields are required', status: 400 });
      }

      // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // if (!user_Email.match(emailRegex)) {
      //     return res.status(400).send({ message: 'Please provide a valid email address', status: 400 });
      // }

      const existingVendor = await vendor.findOne({ _id: vendorId }).lean();
      if (!existingVendor) {
          return res.status(404).send({ message: 'Vendor not found', status: 404 });
      }

      const updatedVendor = await vendor.findOneAndUpdate(
          { _id: vendorId },
          { $set: { user_Name, company_name, mobile_no} },
          { new: true }
      );

      return res.status(200).send({ data: updatedVendor, message: 'Vendor updated successfully', status: 200 });
  } catch (error) {
      return res.status(500).send({ message: error.message || 'Error updating vendor', status: 500 });
  }
};

// Delete vendor by admin
exports.deleteVendor = async (req, res) => {
  try {
      const vendorId = req.params.vendorId;

      const existingVendor = await vendor.findOne({ _id: vendorId }).lean();
      if (!existingVendor) {
          return res.status(404).send({ message: 'Vendor not found', status: 404 });
      }

      await vendor.findOneAndUpdate(
          { _id: vendorId },
          { $set: { deleteFlag: true } }
      );

      return res.status(200).send({ message: 'Vendor deleted successfully', status: 200 });
  } catch (error) {
      return res.status(500).send({ message: error.message || 'Error deleting vendor', status: 500 });
  }
};

