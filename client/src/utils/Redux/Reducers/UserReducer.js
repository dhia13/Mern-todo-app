import { LOGIN, LOGOUT } from "../Types";
const accessToken = JSON.parse(window.localStorage.getItem('accessToken'));
const refreshToken = JSON.parse(window.localStorage.getItem('refreshToken'));

const initialState = (refreshToken) ? {
    refreshToken: refreshToken,
    Logged: false,
    accessToken: accessToken
} :
    {
        Logged: false,
        accessToken: '',
        refreshToken: ''
    }
export default function UserReducer(state = initialState, action) {
    switch (action.type) {

        case LOGOUT:
            return {
                Logged: false
            }
        case LOGIN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                Logged: true
            }

        default: return state
    }
}