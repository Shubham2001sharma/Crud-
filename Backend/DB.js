const mongoose = require("mongoose");

// Replace 'your_connection_string_here' with your actual MongoDB connection string
mongoose
  .connect("mongodb://localhost:27017/Crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
   type:String,
   required:true
},
  phoneNo: {
    type: Number,
    required: true,
  },
});

// Create the user model
const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { User, Employee };
