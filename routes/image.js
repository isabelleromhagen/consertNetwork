const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const connectDB = require('../config/db');
const db = config.get("mongoURI");
const Image = require("../models/Image");
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

module.exports = (upload) => {


const connect = mongoose.createConnection(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
   });

let gfs;

connect.once('open', () => {
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('uploads');
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

upload = multer({ storage })



// @route    POST /image
// @desc     Upload an image
// @access   Private
// router.route('/')
router.post('/', upload.single('file'), (req, res, next) => {
            let newImage = new Image({
                caption: req.body.caption,
                fileName: req.file.filename,
                fileId: req.file.id,
            });
            newImage.save()
            .then((image) => {
                res.status(200).json({
                    success: true,
                    image,
                });
            })
            .catch(err => res.status(500).json(err));
})


// @route    GET /allImages
// @desc     Get all images
// @access   Public
router.get('/files', (req, res) => {
        gfs.files.find().toArray((err, files) => {
            if(!files || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files available'
                });
            }
           return res.json(files);
        });
});

router.get('/files/:id', (req, res) => {
    console.log('reg.params files: ', req.params);
        console.log('id: ', req.params.id);
        const fileId = new ObjectID(req.params.id); 
        console.log('fileId: ',typeof fileId);
        gfs.files.findOne({_id: fileId}, (err, file) => {
             if(!file || file.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No file exists...'
                });
            }
            return res.json(file);
        })
    });

router.get('/image/:id', (req, res) => {
        console.log('reg.params image: ', req.params);
        console.log('id: ', req.params.id);
        const fileId = new ObjectID(req.params.id); 
        console.log('fileId: ',typeof fileId);
        gfs.files.findOne({ _id: fileId }, (err, file) => {
                if(!file || file.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'No files available to render',
                    });
                }
                if(file.contentType === 'image/jpeg'
                || file.contentType === 'image/png'
                || file.contentType === 'image/svg+xml') {

                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
    });

// @route    DELETE /image
// @desc     Delete image by id
// @access   Private
router.delete('/files/:id', async (req, res) => {
        const fileId = new ObjectID(req.params.id);
        const deletedImage = await Image.findOneAndDelete({fileId:fileId});

        gfs.remove({ _id: req.params.id, root: 'uploads' },
            (err, gridStore) => {
                if(err) {
                    return res.status(404).json({ err: err});
                }
                res.status(200).json({
                    success: true,
                    message: `File with ID ${req.params.id} is deleted`,
                });
            });
    });

    return router;
}