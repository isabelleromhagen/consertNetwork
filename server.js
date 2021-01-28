const express = require('express');
const connectDB = require('./config/db');
const config = require("config");
const db = config.get("mongoURI");
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const imageRouter = require("./routes/image");
const app = express();
var fs = require('fs');

dotenv.config();
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const connect = mongoose.createConnection(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
   });

let gfs;

connect.once('open', () => {
    // gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    //     bucketName: "uploads"
    // });
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('upload connected!');
});

const storage = new GridFsStorage({
    url: db,
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
app.use("/", imageRouter(upload));


// app.get('/', (req, res) => res.send('API running!'));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/feed", require("./routes/feed"));



// for GridFS

// mongoose.Promise = require('bluebird');

// const connect = mongoose.connect(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//    });

// connect.then(() => {
//     console.log('Connected to db GridFS!');
// }, (err) => console.log(err));



// end of GridFS

//Heroku
// if(process.env.NODE_ENV === 'production') {
    // app.use(express.static('client/build'));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // });
// }

// Heroku try again...
app.use(express.static(path.join(__dirname, "/client/build/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//starta front + back med npm run dev!