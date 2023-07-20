const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

const authService = require("../services/auth-service");
const boardController = require("../controllers/board-controller");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

router.get('/', boardController.allBoard);
router.get('/list', authService.isLoggedIn, boardController.getBoard)
router.get('/:id', boardController.findBoard);
router.post('/cid', authService.isLoggedIn, boardController.createBoard);
router.post('/uid', authService.isLoggedIn, boardController.updateBoard);
router.get('/did/:id', authService.isLoggedIn, boardController.deleteBoard);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.BOARD_MESSAGE.ERROR, err));
});

module.exports = router;