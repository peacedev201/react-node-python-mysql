var express = require('express');
var router = express.Router();
var fs = require("fs");
const GpxCvt = require('../controller/gpxConvert')
const UIoptions = require('../controller/uioptonsControl')
const TrainTest = require('../controller/trainTest')
const UserControl = require('../controller/userControl')
const FoodControl = require('../controller/foodControl')
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var userfolder = `storage/gpx/uploads/${req.user.id}`
        if (!fs.existsSync(userfolder)) {
            fs.mkdirSync(userfolder);
        }
        cb(null, userfolder)
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});
var upload = multer({ storage: storage })

router.route('/gpxfileupload')
    .post(upload.array('file', 1000), GpxCvt.convertgpx)

router.route('/getgpxs')
    .get(GpxCvt.getOrganizedGpxs)
router.route('/select_gpx_convert')
    .post(GpxCvt.convertAlreadyGpx)

router.route('/getoptions')
    .get(UIoptions.getAllOptionsTxt)

router.route('/systemoptions')
    .get(UIoptions.getSystemOptions)

router.route('/getuserlistoptions')
    .get(UserControl.getUserListOptions)

router.route('/getuseroption')
    .post(UserControl.getUserOption)
router.route('/pythontrain')
    .get(TrainTest.callPythonTrainForHost)
router.route('/getallproducts').get(FoodControl.getAllProducts)
router.route('/getalluserproduct').post(FoodControl.getAllUserProduct)
router.route('/useraddproduct').post(FoodControl.userAddProduct)
router.route('/userdeleteproduct').post(FoodControl.userDeleteProduct)
module.exports = router;