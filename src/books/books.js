import { axiosGet, axiosPost, axiosPut } from '../utilities/Fetch'

const API_URI = process.env.REACT_APP_BASEURL

export const getDataBooks = () => {
    return async (dispatch) => {
        try {
            const data = await axiosGet(`books`)
            dispatch({
                type: 'DETAIL_ALL_BOOK',
                payload: {
                data: data.data,
                }
            })
        }
        catch (e) { throw e }
    }
}
