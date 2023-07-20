const boardService = require("../services/board-service");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

exports.createBoard = async (req, res, next) => {
    const {title, content} = req.body;
    await boardService.createBoard(title, content, req.user.id)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.CREATE)))
        .catch(err => next(err));
};

exports.findBoard = async (req, res, next) => {
    await boardService.findBoard(req.params.id)
        .then((board) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.GET, board)))
        .catch(err => next(err));
};

exports.allBoard = async (req, res, next) => {
    await boardService.allBoard()
        .then((board) => res.status(200).json((response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.GET))))
        .catch(err => next(err));
};

exports.getBoard = async (req, res, next) => {
    await boardService.getBoard(req.user.id)
        .then((board) => res.status(200).json((response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.GET, board))))
        .catch(err => next(err));
};

exports.updateBoard = async (req, res, next) => {
    const {id, title, content} = req.body;
    await boardService.updateBoard(id, title, content)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.UPDATE)))
        .catch(err => next(err));
};

exports.deleteBoard = async (req, res, next) => {
    const id = req.params.id;
    await boardService.deleteBoard(id)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.BOARD_MESSAGE.DELETE)))
        .catch(err => next(err));
};