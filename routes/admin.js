/**
 * Contains all API endpoints used in the app.
 */

const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/',adminController.postMemeForm);                               //endpoint to display the meme form

router.get('/memes/bookmarked',adminController.getFavouriteMemes);          //endpoint to view bookmarked memes

router.get('/memes',adminController.getMemes);                              //endpoint to get array of all memes in db in json format

router.get('/memes/feed',adminController.getMemesFeed);                     //endpoint to view all memes in db

router.get('/memes/:id/edit',adminController.editMemeForm);                 //endpoint to display form form editing a meme

router.get('/memes/:id',adminController.findMeme);                          //endpoint to fetch a particular meme

router.get('/memes/:id/bookmarked',adminController.addToFavourites);        //endpoint to bookmark a meme

router.post('/memes',adminController.postMeme);                             //endpoint to add a new meme

router.delete('/memes/:id',adminController.deleteMeme);                     //endpoint to delete a meme

router.delete('/memes/:id/bookmarked',adminController.removeFromFavourites)//endpoint to remove a meme from "bookmarked"

router.patch('/memes/:id',adminController.editMeme);                       //endpoint to edit a meme

module.exports = router;