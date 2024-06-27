const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    status:{type:String,required:true, default:"new"},
},{timestamps:true,versionKey:false});

const OTPModel = mongoose.model('Otps',DatabaseSchema);
module.exports = OTPModel