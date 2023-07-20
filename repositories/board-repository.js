const Lecture = require('../models/lecture');
const Board = require('../models/board');

exports.getBoard = (id) => Board.findOne({where: {id}, attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt']});

exports.allBoard = () => Board.findAll({attributes: ['id', 'title']});

exports.findBoardByUserId = (userId) => Board.findAll({where: {userId}, attributes: ['id', 'title']});

exports.createBoard = (title, content, userId) => Board.create({title, content, userId});

exports.updateBoard = (id, title, content) => Board.update({title, content}, {where: {id}});

exports.deleteBoard = (id) => Board.destroy({where: {id}});