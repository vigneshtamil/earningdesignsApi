var express = require('express');
var router = express.Router();
const multer = require("multer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, "product_" + Date.now() + "_" + file.originalname)
  }
})

var upload = multer({ storage: storage, fileFilter: fileFilter })

const product = require("../controller").product;
router.post('/product/add', upload.any(), product.insert);
router.get('/product/list', product.list);
router.post('/product/delete', product.delete);

const user = require("../controller").user;
router.post('/signup', user.insert);
router.post('/login', user.login);
router.post('/otpverified', user.otpverified);

module.exports = router;
