const passport = require('passport');
const response = require("../messages/responseFrom");
const resTEXT = require("../messages/responseString");

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError =>
            res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.AUTH_MESSAGE.SUCCESS, {
                userInfo :{
                    userid: user.id,
                    userEmail: user.email,
                    userName: user.name,
                    userNickname: user.nickname,
                    userDescription: user.description
                }
            })));
        else next(info);
    })(req, res, next);
};

exports.logout = async (req, res, next) => {
    req.logout((err) => {
        req.session.destroy();
        if (err) next(err); else res.json(response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.AUTH_MESSAGE.SUCCESS));
    });
}

exports.kakao = passport.authenticate('kakao')

exports.kakaoCall = passport.authenticate('kakao', {failureRedirect: '/'})