import mongoose from 'mongoose'

const tabSchema = new mongoose.Schema({
    name: {type: String},
    created_at: {type: String},
})

// module.exports = mongoose.model('Tab', tabSchema)
export default mongoose.models.Tab || mongoose.model('Tab', tabSchema)