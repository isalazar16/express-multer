var express = require('express');
var router = express.Router();
const multer = require('multer')
var path = require('path');
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const filter = function fileFilter(req, file, cb) {
    if (file.mimetype.split('/')[1] !== 'png') {
        cb(null, false)
    } else {
        cb(null, true)
    }
}
const limits = {
    fileSize: 2000000
}

const upload = multer({ storage: storage, fileFilter: filter, limits: limits })

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})


module.exports = router;
