const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const rideRoutes = require("./routes/ride");
const registrationRoutes = require("./routes/registration");
const donationRoutes = require("./routes/donation");
const merchandiseRoutes = require("./routes/merchandise");
const orderRoutes = require("./routes/order");
const feedbackRoutes = require("./routes/feedback");
const emergencyRoutes = require("./routes/emergency");

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/rides", rideRoutes);
app.use("/registrations", registrationRoutes);
app.use("/donations", donationRoutes);
app.use("/merchandise", merchandiseRoutes);
app.use("/orders", orderRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/emergencies", emergencyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(console.error(), () => {
    console.log(Error);
  });
