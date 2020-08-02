const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// bodyparser middleware
app.use(express.json());

// connect to db
const db = config.get("mongoURI");

// connect to db

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

// use routes
app.use("/api/user", require("./routes/api/user.api"));
app.use("/api/auth", require("./routes/api/auth.api"));
app.use("/api/item", require("./routes/api/items.api"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server start on port ${port}`));
