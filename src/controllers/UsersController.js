const UsersModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const OTPModel=require('../models/OtpModel');
const EmailSend=require('../utility/EmailHelper');


exports.registration = async (req, res) => {
    try {
        const existingUser = await UsersModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ status: "Failed", message: "Email already exists." });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await UsersModel.create({ ...req.body, password: hashedPassword });
        res.status(200).json({ status: "Success", message: "Registration Successful.", data: user });
    } catch (err) {
        res.status(500).json({ status: "Failed", err: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Failed", message: "Email and password are required." });
        }

        const users = await UsersModel.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1, firstName: 1, lastName: 1, email: 1, mobile: 1, password: 1, photo: 1 } }
        ]);

        if (users.length === 0) {
            return res.status(401).json({ status: "Unauthorized", message: "User Not Found" });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ status: "Unauthorized", message: "Password is incorrect" });
        }

        const payload = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.cookie('token', token, cookieOptions);

        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            email: user.email,
            photo: user.photo
        };

        res.status(200).json({ status: "Success", token: token, data: responseData });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Internal server error.", error: error.message });
    }
};

exports.profileUpdate = async (req, res) => {
    try {
        const email = req.headers.email;
        let user = await UsersModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ status: "Failed", message: "User not found." });
        }

        const { email: _, password: newPassword, ...updateData } = req.body;

        Object.assign(user, updateData);

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }
        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            email: user.email,
            photo: user.photo
        };

        await user.save();

        res.status(200).json({ status: "Success", data: responseData });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Internal server error.", error: error.message });
    }
};


exports.getProfileDetails = async (req, res) => {
    try {
        const email = req.headers.email;
        let user = await UsersModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ status: "Failed", message: "User not found." });
        }

        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            email: user.email,
            photo: user.photo
        };

        res.status(200).json({ status: "Success", data: responseData });
    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Internal server error.", error: error.message });
    }
};



exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        let user = await UsersModel.find({ email: email });
        
        if (user.length > 0) {
        
            let recentOTP = await OTPModel.findOne({ email: email, createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } });
            
            if (recentOTP) {
                return res.json({ status: "failed", message: "An OTP has already been sent recently. Please wait 5 minutes before requesting a new one." });
            }
            let otp = Math.floor(1000 + Math.random() * 9000);
            await EmailSend(email, `Your OTP is ${otp}`, 'OTP Verification');
            await OTPModel.create({ email: email, otp: otp, status: "Active" });
            return res.json({ status: "success", message: "OTP Sent Successfully" });
        } else {
            return res.json({ status: "failed", message: "User Not Found" });
        }
    } catch (err) {
        console.error("Error in verifyMobile:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
};

exports.verifyOTP=async(req,res)=>{
    try {
        const { email, otp} = req.params;
        let user = await OTPModel.find({ email:email, otp:otp, status: "Active" });
        
        if (user.length > 0) {
           
            await OTPModel.updateOne({ email: email, otp: otp }, { status: "Verified" });
            
            return res.json({ status: "success", message: "OTP Verified Successfully" });
        } else {
            return res.json({ status: "failed", message: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error in verifyEmail:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
}


exports.passwordReset = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const { password } = req.body;
        
        let user = await OTPModel.findOne({ email: email, otp: otp, status: "Verified" });
        
        if (user) {
            await OTPModel.updateOne({ email: email, otp: otp }, { status: "Used" });
            
            const hashedPassword = await bcrypt.hash(password, 10);
            await UsersModel.updateOne({ email: email }, { password: hashedPassword });
            
            return res.json({ status: "success", message: "Password Reset Successfully" });
        } else {
            return res.json({ status: "failed", message: "Invalid Request" });
        }
    } catch (err) {
        console.error("Error in passwordReset:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
}