import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
    path: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    authorAavatar: {type: String},
    location: {type: String},
    createTime: {type: String, required: true},
    photo_tags: {type: Array}
})

// module.exports = mongoose.model('Photo', photoSchema)
export default mongoose.models.Photo || mongoose.model('Photo', photoSchema)