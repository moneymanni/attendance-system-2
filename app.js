const path = require('path');

const dotenv = require('dotenv');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const { sequelize } = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user-router');
const authRouter = require('./routes/auth-router');
const lectureRouter = require('./routes/lecture-router');
// const timerRouter = require('./routes/timer-router');
const boardRouter = require('./routes/board-router');

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/lecture', lectureRouter);
// app.use('/timer', timerRouter);
app.use('/board', boardRouter);


app.use((req, res, next) => {
    res.locals.title = require('./package.json').name;
    res.locals.port = app.get('port');
    res.locals.user = req.user;
    res.render('./user');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});