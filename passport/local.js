const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user-repository');

module.exports = () => {
    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await userRepository.findUserByEmail(email);
            if (user && await bcrypt.compare(password, user.password))
                done(null, user);
            else
                done(null, false, user ? '비밀번호가 일치하지 않습니다.' : '가입되지 않은 회원입니다.');
        } catch (error) {
            done(error);
        }
    }));
};