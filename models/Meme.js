const mongoose = require('mongoose');

const MemeSchema = mongoose.Schema({
    id:{type:Number,required:true},
    name: {type:String,required:true},
    caption: {type:String,required:true},
    url: {type:String,required:true}
})

module.exports = mongoose.model('memes',MemeSchema);