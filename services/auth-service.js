const userRepository = require('../repositories/user-repository');
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.AUTH_MESSAGE.FAIL_IS_LOGIN));
};

exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.AUTH_MESSAGE.FAIL_IS_NOT_LOGIN));
};

exports.isPermissionIn = async (req, res, next) => {
    const user = await userRepository.getUserPermission(req.user.id);
    if (user.userType == 0 || (req.body.id == req.user.id  || req.params.id == req.user.id )) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.AUTH_MESSAGE.FAIL_NOT_PERMISSION));
};

exports.isAdminIn = async (req, res, next) => {
    const user = await userRepository.getUserPermission(req.user.id)
    if (user.userType == 0) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL,  resTEXT.AUTH_MESSAGE.FAIL_NOT_PERMISSION));
};

exports.isLecturerIn = async (req, res, next) => {
    const user = await userRepository.getUserPermission(req.user.id)
    if (user.userType == 0 || user.userType == 1) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL,  resTEXT.AUTH_MESSAGE.FAIL_NOT_PERMISSION));
};