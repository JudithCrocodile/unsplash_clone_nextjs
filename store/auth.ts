import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>){
            state.token = action.payload
            document.cookie = `token=${action.payload}; path=/;`
            // document.cookie = `token=${action.payload}; path=/; secure; httpOnly`
        },
        logout(state) {
            state.token =  null
            document.cookie = `token=; path=/;`
        }
    }
})

export const {setToken, logout} = authSlice.actions;
export default authSlice.reducer;