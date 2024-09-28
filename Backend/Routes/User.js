const express = require("express");
const router = express();
const {User} = require("../DB");

router.post("/registerData", async (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user object
  const user = new User({ name, email, password });

  try {
    // Save the user to the database
    const savedUser = await user.save();

    // Respond with the saved user data
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    // Handle errors, such as duplicate email
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

router.post("/loginData", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a token

    return res.status(200).json({ message: "User login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
