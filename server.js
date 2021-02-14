const express = require('express');
const connectDB = require('./mongo/db');
const cors = require('cors');
const path = require('path')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const imageRouter = require("./routes/image");
const app = express();
const dotenv = require('dotenv');

dotenv.config()

connectDB();
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use("/", imageRouter());
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/feed", require("./routes/feed"));
app.use(express.static(path.join(__dirname, "/client/build/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//starta front + back med npm run dev!