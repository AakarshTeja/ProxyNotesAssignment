var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'video/mp4') {
            filetype = 'mp4';
        }
        cb(null, 'video-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    res.status(200).json({ fileUrl: 'http://localhost:3000/public/images/' + req.file.filename });
})

module.exports = router;
