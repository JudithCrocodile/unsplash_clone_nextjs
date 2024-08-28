import jwt from 'jsonwebtoken';
import User from '../../models/User'

export default async function getUserByToken(token){    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.payload.userId)
        return user
    } catch (error) {
        return null;
    }
}