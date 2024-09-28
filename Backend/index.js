const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./Routes/User");
const Employee = require("./Routes/Employee");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", User);
app.use("/", Employee);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(5000, () => {
  console.log("app is running on 5000");
});
