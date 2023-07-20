const Sequelize = require('sequelize');

const User = require('./user');
const Lecture = require('./lecture');
const Timer = require('./timer');
const Board = require('./board');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Lecture = Lecture;
db.Timer = Timer;
db.Board = Board;
db.Comment = Comment;

User.init(sequelize);
Lecture.init(sequelize);
Timer.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Lecture.associate(db);
Timer.associate(db);
Board.associate(db);
Comment.associate(db);

module.exports = db;