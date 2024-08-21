import jwt from 'jsonwebtoken';
import User from '../../models/User'

export default async function getUserByToken(token){    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.payload.userId)
    return user
}