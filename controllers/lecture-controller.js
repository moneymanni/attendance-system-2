const lectureService = require("../services/lecture-service");
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

exports.findLecture = async (req, res, next) => {
    await lectureService.getLecture(req.params.code)
        .then((lecture) => res.json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.LECTURE_MESSAGE.GET, lecture)))
        .catch(err => next(err));
};

exports.getLecture = async (req, res, next) => {
        await lectureService.getLectureByUserId(req,params.id)
        .then((lecture) => res.json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.LECTURE_MESSAGE.GET, lecture)))
        .catch(err => next(err));
};

exports.allLecture = async (req, res, next) => {
    await lectureService.findAllLecture()
        .then((lecture) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.LECTURE_MESSAGE.GET, lecture)))
        .catch(err => next(err));
};

exports.createLecture = async (req, res, next) => {
    const {code, title, description, maxNum, userId} = req.body;
    await lectureService.createLecture(code, title, description, maxNum, userId)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.LECTURE_MESSAGE.CREATE)))
        .catch(err => next(err));
};

exports.updateLecture = async (req, res, next) => {
    const {code, title, description, maxNum} = req.body;
    await lectureService.updateLecture(code, title, description, maxNum)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.LECTURE_MESSAGE.UPDATE)))
        .catch(err => next(err));
};

exports.deleteLecture = async (req, res, next) => {
    const code = req.params.code;
    await lectureService.deleteLecture(code)
        .then(() => res.status(200).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS,  resTEXT.LECTURE_MESSAGE.DELETE)))
        .catch(err => next(err));
};