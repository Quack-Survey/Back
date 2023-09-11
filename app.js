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
app.use("/admin", require("./routes/admin"));
app.use("/template", require("./routes/template"));
app.use("/form", require("./routes/form"));
app.use("/formContent", require("./routes/formContent"));
app.use("/templateOption", require("./routes/templateOption"));
app.use("/logic", require("./routes/logic"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
