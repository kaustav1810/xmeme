/**
 * Contains all route functions used in the app.
 */

const Meme = require('../models/Meme');
const LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');


exports.postMemeForm = (req, res) => res.render('index',{editing:false});

exports.postMeme = async (req, res) => {
	const { name, caption, url } = req.body;

	if (await findDuplicates(req.body)) return res.sendStatus(409);

	const id = await generateId();

	const meme = new Meme({ id, name, caption, url });

	meme.save();

	let newMeme = meme.toObject();

	delete newMeme._id;

	res.send({id:id.toString()});
};

exports.getMemes = async (req, res) => {
	const memes = (await Meme.find().sort({ field: 'asc', _id: -1 }).limit(100).select('-_id')) || [];

	res.send(memes);
};

exports.getMemesFeed = async (req, res) => {
	//get last 100 memes from db
	const memes = (await Meme.find().sort({ field: 'asc', _id: -1 }).limit(100).select('-_id')) || [];

	res.render('memes', { memes,favourites:false });
};

exports.findMeme = async (req, res) => {
	const id = req.params.id;

	try {
		const meme = await Meme.findOne({ id }, { _id: 0 });
		return meme ? res.json(meme) : res.sendStatus(404);
	} catch (err) {
		console.log(err);
		res.sendStatus(404);
	}
};

exports.editMeme = async (req, res) => {
	try {
		const newMeme = await Meme.findOneAndUpdate(
			{ id: req.params.id },
			{
				caption: req.body.caption,
				url: req.body.url
			}
		);
		newMeme?res.sendStatus(200):res.sendStatus(404);
	} catch (err) {
		console.log(err);
		res.sendStatus(404);
	}
};

exports.editMemeForm = (req, res) => {
	res.render('index', { id: req.params.id,editing:true });
};

exports.deleteMeme = async(req,res)=>{
	const {id} = req.params;

	await Meme.findOneAndDelete({id});

	removeBookmarkedMeme(id);

	res.redirect('/memes/feed');
}


exports.addToFavourites = async (req, res) => {
	
    const {id} = req.params;

    bookmarkMeme(id);

	res.redirect('/memes/feed');
};

exports.getFavouriteMemes = async (req, res) => {
	
    const favouriteMemes = await getFavourites();

	res.render('memes', { memes: favouriteMemes,favourites:true });
};

exports.removeFromFavourites = async(req,res)=>{
    const {id} = req.params;

    removeBookmarkedMeme(id);

	res.redirect('/memes/bookmarked');
}


// helper functions

// function to generate "id" field for a meme
async function generateId() {
	const lastRecord = await Meme.findOne().sort({ field: 'asc', _id: -1 }).limit(1);

	return (lastRecord && parseInt(lastRecord.id) + 1) || 0;
}

// function to check if meme with same name/caption/url already exists
async function findDuplicates({name,caption,url}) {
	const oldMeme = await Meme.findOne({
		$or: [ { name }, { caption }, { url } ]
	});

	return oldMeme;
}

// function to bookmark a meme by saving it's "id" to localstorage
function bookmarkMeme(id){
    const favouriteMemeIds = JSON.parse(localStorage.getItem('favourites') || '[]');

	//if it's already bookmarked simply return
    if(favouriteMemeIds.includes(id)) return;

	favouriteMemeIds.push(id);

	localStorage.setItem('favourites', JSON.stringify(favouriteMemeIds));
}

// function to retrieve bookmarked memes from localstorage
async function getFavourites(){
	const favouriteMemeIds = JSON.parse(localStorage.getItem('favourites') || '[]');
	
	const favouriteMemes = await Promise.all(favouriteMemeIds.map(async (item) => {
		const {id,name,caption,url} = await Meme.findOne({ id: item });

		 return {id,name,caption,url};

	}));

    return favouriteMemes;
}

function removeBookmarkedMeme(id){
	const favouriteMemeIds = JSON.parse(localStorage.getItem('favourites') || '[]');
    
	
    favouriteMemeIds.splice(favouriteMemeIds.indexOf(id),1);

	localStorage.setItem('favourites',JSON.stringify(favouriteMemeIds));
}