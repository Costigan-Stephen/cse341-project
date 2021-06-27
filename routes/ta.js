const express = require('express');
const router = express.Router();

const taController = require('../controllers/ta');
const svController = require('../controllers/server');

router.get('/prove/04', taController.getTA04);

router.get('/prove/05', taController.getTA05);

router.get('/prove/08', taController.getTA08);

router.get('/prove/09', taController.getTA09);

router.get('/prove/10', taController.getTA10);

router.post('/prove/10/post', svController.submitName);
router.post('/prove/10/postData', svController.post);

module.exports = router;