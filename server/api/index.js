const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const friendRouter = require('./friend');

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/friend', friendRouter);

module.exports = router;
