const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API running!'));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/feed", require("./routes/feed"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//starta front + back med npm run dev!