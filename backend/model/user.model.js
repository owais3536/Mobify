const { mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    phoneNumber: { type: String, require: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;