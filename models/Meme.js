const mongoose = require('mongoose');

const MemeSchema = mongoose.Schema({
    id:{type:String,required:true},
    name: {type:String,required:true},
    caption: {type:String,required:true},
    url: {type:String,required:true}
},{ versionKey: false })

module.exports = mongoose.model('memes',MemeSchema);