const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/UserRoute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/api", userRouter);

const uri =
  "mongodb+srv://mindaugas:rheK5rX9nZj6fQc@ibm-lu4bb.mongodb.net/users?retryWrites=true";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Success connect to Database"))
  .catch(error => console.log(error));

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
