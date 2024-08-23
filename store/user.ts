import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
    userInfo: object,
    // userName:  string,
    // email: string,
    // password:  string,
    // created_at:  string,
    // updated_at:  string,
    // firstName:  string,
    // lastName:  string,
    // avatarPath:  string,
}

const initialState: AuthState = {
    userInfo:{
        userName: '',
        email: '',
        password: '',
        created_at: '',
        updated_at: '',
        firstName: '',
        lastName: '',
        avatarPath: '',
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<object>){
            state.userInfo = action.payload
        },
        removeUserInfo(state) {
            state.userInfo =  initialState
        }
    }
})

export const {setUserInfo, removeUserInfo} = userSlice.actions;
export default userSlice.reducer;