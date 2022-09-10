import { LOGIN, LOGOUT } from '../Types'
export const LoginAction = (tokens) => async dispatch => {
    try {
        dispatch({
            type: LOGIN,
            payload: tokens
        })
    } catch (error) {

    }
}
export const LogoutAction = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT
        })
    } catch (error) {

    }
}

