const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/',adminController.getIndex);
router.post('/memes',adminController.postMeme);
router.get('/memes',adminController.getMemes);
router.get('/memes/:id',adminController.findMeme);

module.exports = router;