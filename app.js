const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3033;
const DB_URI = process.env.DB_URI;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sessionMiddleware = require('./middleware/sessionMiddleware');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect to Db
async function connectDb() {
  await mongoose.connect(DB_URI);
  console.log("Connected to Database");
}
connectDb();

//Set routes
app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server Created Successfully at port ${port}`);
  }
});
