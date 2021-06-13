const express = require('express');
const router = express.Router();

const taController = require('../controllers/ta')

router.get('/ta04', taController.getTA04);

router.get('/ta05', taController.getTA05);

router.get('/ta08', taController.getTA08);

module.exports = router;