const lectureRepository = require('../repositories/lecture-repository');
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");
const { max } = require('../models/lecture');

exports.isPermissionIn = async (req, res, next) => {
    const lecture = await lectureRepository.getLectureUserId(req.user.id);
    if (lecture == req.user.id || lecture == req.params.id) next(); else res.status(403).json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.AUTH_MESSAGE.FAIL_NOT_PERMISSION));
};

exports.createLecture = async (code, title, description, maxNum, userId) => {
    const lecture = await lectureRepository.findLectureByCode(code);
    if (lecture) {
        console.error(`[LectureService] 강의 추가를 실패.`);
        throw '이미 등록된 강의 코드입니다.';
    }
    await lectureRepository.createLecture(code, title, description, max, userId);
};

exports.updateLecture = async (code, title, description, maxNum) => {
    const lecture = await lectureRepository.findLectureByCode(code);
    if (!lecture) {
        console.error(`[LectureService] 강의정보 업데이트 실패. `);
        throw ('Not updated!');
    }
    await lecture.updateLecture(code, title, description, maxNum);
    console.log(`${code} 강의 정보 업데이트 완료`)
};

exports.deleteLecture = async (code) => {
    const result = await lectureRepository.deleteLecture(code);
    if (!result) {
        console.error(`[LectureService] 강의 정보 삭제실패.`);
        throw ('Not delete!');
    }
    console.log(`${code} 강의 삭제 완료`)
};

exports.findAllLecture = async () => {
    console.log(`[LectureService] 강의정보 요청`);
    const lecture = await lectureRepository.findAllLecture();
    if (!lecture) {
        console.error("[LectureService] 강의 정보 없음");
        throw `강의 정보 없음`;
    }
    return lecture;
};

exports.getLecture = async (code) => {
    const lecture = await lectureRepository.findLectureByCode(code);
    if (!lecture) throw `[LectureService] ${code} 강의 정보 없음`;
    return lecture;
};

exports.getLectureByUserId = async (userId) => {
    const lecture = await lectureRepository.findLectureByUserId(userId);
    if (!lecture) {
        console.error("[LectureService] 강의 정보 없음");
        throw `강의 정보 없음`;
    }
    return lecture;
}