const userService = require('../services/user-serivce');
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

exports.findUser = async (req, res, next) => {
    await userService.getUser(req.params.id)
        .then((user) => res.json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.USER_MESSAGE.GET, user)))
        .catch(err => next(err));
};

exports.getUser = async (req, res, next) => {
    await userService.findAllUser()
        .then((user) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.USER_MESSAGE.GET, user)))
        .catch(err => next(err));
};

exports.createUser = async (req, res, next) => {
    const {email, password, userType, name, nickname, description} = req.body;
    await userService.createUser(email, password, userType, name, nickname, description)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.USER_MESSAGE.CREATE)))
        .catch(err => next(err));
};

exports.updateUser = async (req, res, next) => {
    const {id, nickname, description} = req.body;
    await userService.updateUser(id, nickname, description)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.USER_MESSAGE.UPDATE)))
        .catch(err => next(err));
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    await userService.deleteUser(id)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.USER_MESSAGE.DELETE)))
        .catch(err => next(err));
};