const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API running!'));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));