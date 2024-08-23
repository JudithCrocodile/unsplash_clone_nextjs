import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth'
import userReducer from './user'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user']
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;