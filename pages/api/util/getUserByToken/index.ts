import jwt from 'jsonwebtoken';
import User from '../../models/User'

export type TokenErrorType = 'expired' | 'invalid';

export default async function getUserByToken(token: string): Promise<{ user: any | null; error: TokenErrorType | null}>{    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { payload: { userId: string} };
        const user = await User.findById(decoded.payload.userId);
        return {user, error: null}
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            return {user: null, error: 'expired'}
        }
                if(error instanceof jwt.JsonWebTokenError) {
            return {user: null, error: 'invalid'}
        }
        return {user: null, error: 'invalid'};
    }
}