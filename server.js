const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// for GridFS
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

// end of GridFS

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