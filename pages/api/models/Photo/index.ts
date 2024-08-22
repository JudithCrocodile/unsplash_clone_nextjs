import mongoose from 'mongoose'
// import User from './User';

const photoSchema = new mongoose.Schema({
    path: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    authorAavatar: {type: String},
    location: {type: String},
    createTime: {type: String, required: true},
    photo_tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tab'}]
})

export default mongoose.models.Photo || mongoose.model('Photo', photoSchema)