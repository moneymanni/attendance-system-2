const Lecture = require('../models/lecture');

exports.getLectureUserId = (code) => Lecture.findOne({where: {code}, attributes: ['userId']})

exports.findLectureByCode = (code) => Lecture.findOne({where: {code}});

exports.findLectureByUserId = (id) => Lecture.findAll({where: {userId}});

exports.findAllLecture = () => Lecture.findAll({attributes: ['code', 'title', 'description', 'maxNum', 'userId']});

exports.createLecture = (code, title, description, maxNum, userId) => Lecture.create({code, title, description, maxNum, userId});

exports.deleteLecture = (code) => Lecture.destroy({where: {code}});

exports.updateLecture = (code, title, description, maxNum) => Lecture.update({title, description, maxNum}, {where: {code}});