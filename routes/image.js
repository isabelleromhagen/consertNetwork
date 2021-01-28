const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const connectDB = require('../config/db');
const db = config.get("mongoURI");
const Image = require("../models/Image");
const multer = require('multer');
const Grid = require('gridfs-stream')

module.exports = (upload) => {
    // const url = config.mongoURI;
    // console.log(db);
    // const url = db;
const connect = mongoose.createConnection(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
   });

let gfs;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
    console.log('upload connected!');
});

// @route    POST /image
// @desc     Upload an image
// @access   Private
router.route('/')
    .post(upload.single('file'), (req, res, next) => {
        console.log('req.body: ',req.body);
        console.log('req.file: ', req.file);

    Image.findOne({caption: req.body.caption})
        .then((image) => {
            // console.log(image);
            if(image) {
                return res.status(200).json({
                    success: false,
                    message: 'Image already exists',
                });
            }
            let newImage = new Image({
                caption: req.body.caption,
                fileName: req.file.filename,
                fileId: req.file.id,
            });
            console.log('new image: ', newImage);
            newImage.save()
            .then((image) => {
                res.status(200).json({
                    success: true,
                    image,
                });
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
})

// @route    GET /allImages
// @desc     Get all images
// @access   Public
router.route('/files')
    .get((req, res, next) => {
        gfs.find().toArray((err, files) => {
            if(!files || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available'
                });
            }
            files.map(file => {
                if(file.contentType === 'image/jpeg'
                || file.contentType === 'image/png'
                || file.contentType === 'image/svg+xml') {
                    file.isImage = true;
                } else {
                    file.isImage= false
                }
            });
            console.log('success! sending: ', files);
            res.status(200).json({
                success: true,
                files,
            });
        });
    });


// @route    GET /image
// @desc     Get image by filename/username
// @access   Public
// router.route('/file/:filename')
router.route('/file/:filename')
    .get((req, res, next) => {
        console.log('non-render');
        console.log(req.params.filename);
        gfs.find({ filename: req.params.filename })
            .toArray((err, files) => {
                console.log('files: ', files);
                if(!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }
                res.status(200).json({
                    success: true,
                    file: files[0],
                });
            });
    });

// @route    GET /image
// @desc     Get image by filename
// @access   Public
router.route('/:filename')
    .get((req, res, next) => {
        console.log('non-render');
        console.log(req.params.filename);
        // const filename = "619182b49c92a971dff91eb9a60954b8.jpg";
        gfs.find({ filename: req.params.filename })
            .toArray((err, files) => {
                if(!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available to render',
                    });
                }

                if(files[0].contentType === 'image/jpeg'
                || files[0].contentType === 'image/png'
                || files[0].contentType === 'image/svg+xml') {
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
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
router.route('/file/del/:id')
    .post((req, res, next) => {
        console.log(re.params.id);
        gfs.delete(new mongoose.Types.ObjectId(req.params.id),
            (err, data) => {
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
    // module.exports = router;
}

