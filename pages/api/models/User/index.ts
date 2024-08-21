import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    created_at: {type: String, required: true},
    updated_at: {type: String, required: true},  
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
})

// module.exports = mongoose.model('User', userSchema)

export default mongoose.models.User || mongoose.model('User', userSchema)