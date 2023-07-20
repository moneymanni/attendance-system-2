const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user-repository');

exports.createUser = async (email, password, userType, name, nickname, description) => {
    const user = await userRepository.findUserByEmail(email);

    if (user) {
        console.error('[UserService] 사용자 추가 실패');
        throw '이미 등록된 사용자 아이디입니다.';
    }
    const hash = await bcrypt.hash(password, 12);
    await userRepository.createUser(email, hash, userType, name, nickname, description);
};

exports.updateUser = async (id, nickname, description) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
        console.error(`[UserService]유저정보 업데이트 실패. `);
        throw ('Not updated!');
    }
    await userRepository.updateUser(id, nickname, description);
    console.log(`${id} 유저 정보 업데이트 완료`);
};

exports.deleteUser = async (id) => {
    const result = await userRepository.deleteUser(id);
    if (!result) {
        console.error(`[UserService]유저 정보 삭제실패.`);
        throw ('Not delete!');
    }
    console.log(`${id} 유저 삭제 완료`);
};

exports.findAllUser = async () => {
    const user = await userRepository.findAllUser()
    if (!user) {
        console.error("[UserService] 유저 정보 없음");
        throw `유저 정보 없음`;
    }
    return user;
};

exports.getUser = async (id) => {
    const user = await userRepository.getUser(id);
    if (!user) throw `[UserService] ${id} 유저 정보 없음`;
    return user;
};