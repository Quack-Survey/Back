require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4500;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.use("/api", require("./routes/api"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
