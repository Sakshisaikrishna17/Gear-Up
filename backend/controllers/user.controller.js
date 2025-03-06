const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const user = require('../models/user.model');

// Function to generate JWT token
function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

// ✅ User Signup API
exports.userSignUp = async (req, res) => {
    try {
        console.log("📌 Incoming Request Body:", req.body); // ✅ Debugging log

        const { user_Email, user_Name, country_code, mobile_no, password, userType } = req.body;

        // Validation
        if (!user_Email) return res.status(400).send({ message: "Email is required", status: 400 });
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_Email)) {
            return res.status(400).send({ message: "Email is not in correct format", status: 400 });
        }
        if (!user_Name) return res.status(400).send({ message: "Full name is required", status: 400 });
        if (!country_code) return res.status(400).send({ message: "Country code is required", status: 400 });
        if (!mobile_no) return res.status(400).send({ message: "Mobile Number is required", status: 400 });
        if (mobile_no.length < 7 || mobile_no.length > 15 || isNaN(mobile_no)) {
            return res.status(400).send({ message: "Mobile number must be between 7-15 digits and numeric only.", status: 400 });
        }
        if (!password) return res.status(400).send({ message: "Password is required", status: 400 });
        if (password.length < 8 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(password)) {
            return res.status(400).send({
                message: "Password must be at least 8 characters long, including one uppercase, one lowercase, one number, and one symbol.",
                status: 400
            });
        }
        if (!userType) return res.status(400).send({ message: "User type is required", status: 400 });

        // Check if Email or Mobile Number Already Exists
        const existingUser = await user.findOne({ $or: [{ user_Email }, { mobile_no }] }).lean();
        if (existingUser) {
            return res.status(409).send({ message: "Email or Mobile Number already exists", status: 409 });
        }

        // Create New User
        const newUser = await user.create({
            user_Email,
            user_Name,
            userType,
            country_code,
            mobile_no,
            password: bcrypt.hashSync(password, 8),
        });

        return res.status(200).send({ data: newUser, message: "User registered successfully", status: 200 });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return res.status(500).send({ message: error.message || "Internal Server Error", status: 500 });
    }
};

// ✅ User Login API
exports.userLogin = async (req, res) => {
    try {
        const { user_Email, password } = req.body;

        if (!user_Email || !password) {
            return res.status(400).send({ message: "Please provide both email and password.", status: 400 });
        }

        const userData = await user.findOne({ user_Email, deleteFlag: false });

        if (!userData) {
            return res.status(404).send({ message: "Your email is not registered with us.", status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid password.", status: 401 });
        }

        const token = generateToken(userData._id);
        return res.status(200).send({ accessToken: token, data: userData, message: "Login successful!", status: 200 });

    } catch (error) {
        console.error("❌ Login Error:", error);
        return res.status(500).send({ message: "Internal server error.", status: 500 });
    }
};

// ✅ Change User Password API
exports.changeUserPassword = async (req, res) => {
    try {
        const { usersRegId } = req.params;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({ message: "All password fields must be provided.", status: 400 });
        }
        if (newPassword !== confirmPassword) {
            return res.status(401).send({ message: "New password and confirm password do not match.", status: 401 });
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(newPassword)) {
            return res.status(400).send({
                message: "Password must be at least 8 characters long and include one uppercase, one lowercase, one number, and one symbol.",
                status: 400
            });
        }

        const existingUser = await user.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: "User not found.", status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Incorrect old password.", status: 401 });
        }

        await user.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: "Password changed successfully.", status: 200 });

    } catch (error) {
        console.error("❌ Change Password Error:", error);
        return res.status(500).send({ message: "Error changing password.", status: 500 });
    }
};



