require("dotenv").config();
const { connectDB } = require("./config/db");
connectDB();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Keyinroq urinib ko'ring",
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
