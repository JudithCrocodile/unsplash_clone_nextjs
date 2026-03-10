import mongoose from 'mongoose'
// import User from './User';

const photoSchema = new mongoose.Schema({
    path: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    authorAavatar: {type: String},
    location: {type: String},
    createTime: {type: Date, required: true},
    photo_tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tab'}],
    fileId: {type: mongoose.Schema.Types.ObjectId, required: false},
    cloudinary_public_id: {type: String, required: false},
})

export default mongoose.models.Photo || mongoose.model('Photo', photoSchema)