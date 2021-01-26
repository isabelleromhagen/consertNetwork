const url = config.mongoURI;
const connect = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});

// @route    POST /image
// @desc     Upload an image
// @access   Private
imageRouter.route('/').post(upload.single('file'), (req, res, next) => {
    console.log(req.body);

    Image.findOne({caption: req.body.caption})
        .then((image) => {
            console.log(image);
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

// @route    GET /image
// @desc     Get image by filename
// @access   Public
imageRouter.route('/file/:filename')
    .get((req, res, next) => {
        gfs.find({ filename: req.params.filename })
            .toArray((err, files) => {
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
imageRouter.route('/image/:filename')
    .get((req, res, next) => {
        gfs.find({ filename: req.params.filename })
            .toArray((err, files) => {
                if(!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
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
imageRouter.route('/file/del/:id')
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