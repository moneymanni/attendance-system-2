const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth-controller");
const authService = require("../services/auth-service");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

router.post('/login', authService.isNotLoggedIn, authController.login);
router.get('/logout', authService.isLoggedIn, authController.logout);
router.get('/kakao', authController.kakao);
router.get('/kakao/callback', authController.kakaoCall, (req, res) => res.redirect('/'));

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.AUTH_MESSAGE.FAIL, err));
});

module.exports = router;