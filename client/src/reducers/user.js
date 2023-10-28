import {
    CREATE_USER,
    LOGIN_USER,
    GET_USER,
    LOGOUT_USER
} from "../actions/types";

const initialState = {
    userData: {},
    isAuth: false,
    JWT_TOKEN: ""
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state,  userData: action.payload.userData, JWT_TOKEN: action.payload.JWT_TOKEN };
        case LOGIN_USER:
            localStorage.setItem("token", action.payload.JWT_TOKEN)
            return { ...state, JWT_TOKEN: action.payload.token };
        case GET_USER:
            return { ...state, userData: action.payload.userData, isAuth: true }
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return { ...state, userData: {}, isAuth: false };
        default:
            return state;
    }
};

export default user;