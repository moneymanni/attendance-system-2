const User = require('../models/user');

exports.getUser = (id) => User.findOne({where: {id}, attributes: ['id', 'email', 'name', 'nickname', 'description', 'createdAt', 'updatedAt']});

exports.getUserPermission = (id) => User.findOne({where: {id}, attributes: ['userType']});

exports.addAdmin = (id) => User.update({userType: 0}, {where: {id}});

exports.addLecturer = (id) => User.update({userType: 1}, {where: {id}});

exports.addStudent = (id) => User.update({userType: 2}, {where: {id}});

exports.findUserById = (id) => User.findOne({where: {id}});

exports.findUserByEmail = (email) => User.findOne({where: {email}})

exports.findAllUser = () => User.findAll({attributes: ['email', 'nickname', 'description']});

exports.createUser = (email, password, userType, name, nickname, description) => User.create({email, password, userType, name, nickname, description});

exports.deleteUser = (id) => User.destroy({where: {id}});

exports.updateUser = (id, nickname, description) => User.update({nickname, description}, {where: {id}});
