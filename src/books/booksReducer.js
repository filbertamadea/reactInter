// const initState = {
//     booksList: {},
// }

// function BooksReducer(state = initState, action) {
//     switch (action.type) {

//         case 'DETAIL_ALL_BOOK':
//             const booksList = {
//                 ...state,
//                 booksList: action.payload.data,
//             }
//             return booksList

//         default:
//             return state;
//     }
// }

// export default BooksReducer;
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        token: '',
        isAuth: false,
        data: {}
    },
    reducers: {
        login(state, actions) {
            return {
                ...state,
                isAuth: true,
                token: actions.payload
            }
        },
        logout(state, actions) {
            return {
                ...state,
                isAuth: false,
                token: ''
            }
        },
        booksList(state, actions) {
            return {
                ...state,
                booksList: actions.payload.data,
            }
        }
    }
})

export const { login, logout, booksList } = userSlice.actions
export default userSlice.reducer

