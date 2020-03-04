const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.docs')
        cb(null, +'-' + file.originalname)
    }
});

const upload = multer({storage: storage}).single('file');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // An error occurred when uploading
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        res.json({
            success: true,
            message: 'Assignment uploaded!'
        });
    })
});

module.exports = router;
