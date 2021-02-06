const Meme = require('../models/Meme');

exports.getIndex = (req,res)=> res.render('index');

exports.postMeme = async(req,res)=> {

    const {name,caption,url} = req.body;


    const id = await generateId();


    const meme = new Meme({id,name,caption,url});

    meme.save();

    console.log('meme created!');

    res.json({id});

    res.redirect('/memes');
}

exports.getMemes = async(req,res)=>{
    const memes = await Meme.find().sort({field:'asc',_id:-1}).limit(100) || [];
    

    res.render('memes',{memes});

}

exports.findMeme = async(req,res)=>{
    const id = req.params.id;

    const meme = await Meme.findOne({id},{_id:0,__v:0});

    res.json(meme);
}

async function generateId(){
    const lastRecord = await Meme.findOne().sort({field:'asc',_id:-1}).limit(1);

    return (lastRecord && lastRecord.id+1) || 0;
}