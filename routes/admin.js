const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/',adminController.postMemeForm);
router.get('/memes/bookmarked',adminController.getFavouriteMemes);
router.get('/memes',adminController.getMemes);
router.get('/memes/feed',adminController.getMemesFeed);
router.get('/memes/:id/edit',adminController.editMemeForm);
router.get('/memes/:id',adminController.findMeme);
router.delete('/memes/:id/bookmarked',adminController.removeFromFavourites)
router.get('/memes/:id/bookmarked',adminController.addToFavourites);
router.post('/memes',adminController.postMeme);
router.patch('/memes/:id',adminController.editMeme);

module.exports = router;