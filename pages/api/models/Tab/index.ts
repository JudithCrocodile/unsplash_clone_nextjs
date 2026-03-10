import mongoose from 'mongoose'

const tabSchema = new mongoose.Schema({
    name: {type: String},
    created_at: {type: Date, default: Date.now},
}, 
    { collection: 'tabs' }
)

export default mongoose.models.Tab || mongoose.model('Tab', tabSchema)