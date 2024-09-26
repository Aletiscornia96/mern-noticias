import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  useReducer  from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
 

const rootReducer = combineReducers({
    user: useReducer,
});

const presistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const presistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
    reducer: presistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false 
    }),
});

export const persistor = persistStore (store);