// config store
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import BooksReducer from '../books/booksReducer'
import { combineReducers } from 'redux'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
    key: 'react',
    storage
}

const reducers = combineReducers({
    BooksReducer: BooksReducer
})

const persistReducers = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistReducers,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})
