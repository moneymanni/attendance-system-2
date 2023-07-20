const boardRepository = require("../repositories/board-repository");

exports.createBoard = async (title, content, userId) => {
    await boardRepository.createBoard(title, content, userId);
};

exports.findBoard = async (id) => {
    const board = await boardRepository.getBoard(id);
    if (!board) throw `[BoardService] ${id} 게시판 없음`;
    return board;
};

exports.getBoard = async (userId) => {
    console.log(`[BoardService] 게시판 정보 요청`);
    const board = await boardRepository.findBoardByUserId(userId);
    if (!board) {
        console.error(`[BoardService] 게시판 정보 없음`);
        throw `게시판 정보 없음`;
    }
    return board;
};

exports.allBoard = async () => {
    console.log(`[BoardService] 게시판 정보 요청`);
    const board = await boardRepository.allBoard();
    if (!board) {
        console.error(`[BoardService] 게시판 정보 없음`);
        throw `게시판 정보 없음`;
    }
    return board;
};

exports.updateBoard = async (id, title, content) => {
    const board = await boardRepository.updateBoard(id, title, content);
    if (!board) {
        console.error(`[BoardService] 게시판 정보 업데이트 실패`)
        throw '업데이트 실패!';
    }
    console.log(`${id} 게시판 정보 업데이트 완료`);
};

exports.deleteBoard = async (id) => {
    const board = await boardRepository.deleteBoard(id);
    if (!board) {
        console.error(`[BoardService] 게시판 정보 삭제 실패`)
        throw '삭제 실패!';
    }
    console.log(`게시판: ${id} 삭제 완료`);
};