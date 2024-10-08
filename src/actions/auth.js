import {
    API_LOGIN,
} from "../constants/api";
import {
    API,
    LOGIN_S,
    LOGIN_F,
    LOGOUT
} from "../constants/types";

export const doLogin = (data) => ({
    type: API,
    payload: {
        url: API_LOGIN,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: LOGIN_S,
            payload: data
        }),
        error: (data) => ({
            type: LOGIN_F,
            payload: data
        })
    }
})

export const doLogout = () => ({
    type: LOGOUT
})

export const dummyLogin = () => ({
    type: LOGIN_S,
    payload: {
        id: 1,
        name: 'John Doe',
        token: 'dummy-auth-token',
    }
})