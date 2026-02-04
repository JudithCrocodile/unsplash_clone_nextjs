import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    created_at: {type: String, required: true},
    updated_at: {type: String, required: true},  
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fileId: {type: mongoose.Schema.Types.ObjectId, required: false},
    reset_token_hash: {type: String, required: false},
    reset_token_expires_at: {type: Date, required: false},
})

export default mongoose.models.User || mongoose.model('User', userSchema)