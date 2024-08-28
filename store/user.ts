import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IUserInfo {
    userName:  string,
    email: string,
    password:  string,
    created_at:  string,
    updated_at:  string,
    firstName:  string,
    lastName:  string,
    avatarPath:  string,
}

interface AuthState {
    userInfo: IUserInfo,
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
        updateAvatar(state, action: PayloadAction<object>){
            console.log('action.payload', action.payload)
            state.userInfo.avatarPath = action.payload
            console.log('state.userInfo', state.userInfo)
        },
        removeUserInfo(state) {
            state.userInfo =  initialState
        }
    }
})

export const {setUserInfo, removeUserInfo, updateAvatar} = userSlice.actions;
export default userSlice.reducer;