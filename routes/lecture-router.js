const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

const lectureController = require("../controllers/lecture-controller");
const lectureService = require("../services/lecture-service");
const authService = require("../services/auth-service");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

router.use(bodyParser.json());

router.get('/', lectureController.allLecture);
router.get('/:code', lectureController.findLecture);
router.get('/list/:id', authService.isLoggedIn, lectureService.isPermissionIn, lectureController.getLecture);
router.post('/cid', authService.isLoggedIn, authService.isLecturerIn, lectureController.createLecture);
router.post('/uid', authService.isLoggedIn, lectureService.isPermissionIn, lectureController.updateLecture);
router.get('/did/:code', authService.isLoggedIn, lectureService.isPermissionIn, lectureController.deleteLecture);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.LECTURER_MESSAGE.ERROR, err));
});

module.exports = router;