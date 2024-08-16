// Schema module.exports model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ name: String, age: Number, sex: String });

module.exports = mongoose.model("User", userSchema);
