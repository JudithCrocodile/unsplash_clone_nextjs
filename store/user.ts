import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IUserInfo {
    userName:  string,
    email: string,
    password:  string,
    created_at:  string,
    updated_at:  string,
    firstName:  string,
    lastName:  string,
    fileId:  string,
    _id: string
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
        fileId: '',
        _id: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<IUserInfo>){
            state.userInfo = action.payload
        },
        updateAvatar(state, action: PayloadAction<string>){
            state.userInfo.fileId = action.payload
        },
        removeUserInfo(state) {
            state.userInfo =  initialState.userInfo
        }
    }
})

export const {setUserInfo, removeUserInfo, updateAvatar} = userSlice.actions;
export default userSlice.reducer;