const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

module.exports = router;
