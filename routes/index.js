const express = require('express');
const router = express.Router();

router.get('/ping', async (req, res, next) => {
    res.json({'return': 'pong'})
});

module.exports = router;