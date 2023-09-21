/** @format */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/member');

router.get('/', controller.getAllMembers);

module.exports = router;
