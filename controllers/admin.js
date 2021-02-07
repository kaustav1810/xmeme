const Meme = require('../models/Meme');

exports.getIndex = (req,res)=> res.render('index');

exports.postMeme = async(req,res)=> {

    const {name,caption,url} = req.body;

    if(findDuplicates()) return res.sendStatus(409);


    const id = await generateId();


    const meme = new Meme({id,name,caption,url});

    meme.save();

    let newMeme = meme.toObject();

    delete newMeme._id;

    console.log('meme created!');

    if(req.accepts('json')){
        res.send(newMeme);
       }else{
        res.redirect('/memes')
       }
}

exports.getMemes = async(req,res)=>{
    const memes = await Meme.find().sort({field:'asc',_id:-1}).limit(100).select("-_id") || [];
    
    // if(req.accepts('json')){
    //     return res.send(memes);
    //    }else{
        return res.render('memes', {memes});
    //    }

}

exports.findMeme = async(req,res)=>{
    const id = req.params.id;

    try{
    const meme = await Meme.findOne({id},{_id:0});
    return meme?res.json(meme):res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(404);
    }
}

exports.editMeme = async(req,res)=>{

    try{
    const newMeme = await Meme.findOneAndUpdate({id:req.params.id},{
        caption:req.body.caption,
        url:req.body.url
    });
    res.sendStatus(200);
}
catch(err){
    console.log(err);
    res.sendStatus(404);
}
}
async function generateId(){
    const lastRecord = await Meme.findOne().sort({field:'asc',_id:-1}).limit(1);

    return (lastRecord && parseInt(lastRecord.id)+1) || 0;
}

async function findDuplicates(){
    const oldMeme = await Meme.findOne({$or: [
        {name: req.body.name},
        {caption: req.body.caption},
        {url: req.body.url}
    ]});

    return oldMeme?true:false;
}