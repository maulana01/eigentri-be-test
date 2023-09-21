/** @format */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');

router.get('/', controller.getAllBooks);
router.post('/borrow', controller.borrowBook);
router.post('/return', controller.returnBook);

module.exports = router;
