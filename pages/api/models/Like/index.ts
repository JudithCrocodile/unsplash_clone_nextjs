import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({

    photoId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    createTime: {type: String, required: true},
})

export default mongoose.models.Like || mongoose.model('Like', likeSchema)