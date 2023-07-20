const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

const authService = require("../services/auth-service");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

router.use(bodyParser.json());

router.get('/');
router.get('/:id');
router.get('/list/:id');
router.post('/cid');
router.get('/did/:id');

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.TIMER_MESSAGE.ERROR, err));
});

module.exports = router;