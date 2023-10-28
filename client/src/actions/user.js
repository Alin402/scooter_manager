import {
    CREATE_USER,
    ADD_ALERT,
    LOGIN_USER,
    GET_USER,
    LOGOUT_USER
} from "../actions/types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const createUser = async (formData) => {
    try {
        const result = await axios.post("http://localhost:5000/api/users", formData)
        if (result.status === 200) {
            console.log("action sign in success");
        }
        console.log(result.data)
        return result.data;
    } catch (error) {
        const errors = error.response.data.errors;
        return { errors };
    }
}

export const createUserAction = (formData, navigate) => async dispatch => {
    const result = await createUser(formData);
    if (result.errors) {
        result.errors.forEach(error => {
            dispatch({
                type: ADD_ALERT,
                payload: { type: "error", msg: error.msg, ID: uuidv4() }
            })
        })
    } else {
        dispatch({
            type: CREATE_USER,
            payload: { userData: result, JWT_TOKEN: "dcfvkdfvn" }
        })

        dispatch({
            type: ADD_ALERT,
            payload: { type: "success", msg: "Successfully signed in", ID: uuidv4() }
        })
        navigate("/login")
    }
}

const loginUser = async (formData) => {
    try {
        const result = await axios.post("http://localhost:5000/api/users/login", formData)
        if (result.status === 200) {
            console.log("action login in success");
        }
        return result.data;
    } catch (error) {
        const errors = error.response.data.errors;
        return { errors };
    }
}

export const loginUserAction = (formData, navigate) => async dispatch => {
    let result = {};
    result = await loginUser(formData) || {};
    if (result) {
        if (result.errors) {
            result.errors.forEach(error => {
                dispatch({
                    type: ADD_ALERT,
                    payload: { type: "error", msg: error.msg, ID: uuidv4() }
                })
            })
        } else {
            dispatch({
                type: LOGIN_USER,
                payload: { JWT_TOKEN: result.token }
            })
            navigate("/main")
            dispatch(getUserAction());
            dispatch({
                type: ADD_ALERT,
                payload: { type: "success", msg: "Successfully logged in", ID: uuidv4() }
            })
        }
    }
}

const getUser = async () => {
    try {
        const result = await axios.get("http://localhost:5000/api/users/me", {
            headers: {
                "token": localStorage.getItem("token")
            }
        }) || {};
        return result.data;
    } catch (error) {
        const errors = error.response.data.errors;
        return errors;
    }
}

export const getUserAction = () => async dispatch => {
    const result = await getUser() || {};
    if (result.errors) {
        result.errors.forEach(error => {
            dispatch({
                type: ADD_ALERT,
                payload: { type: "error", msg: error.msg, ID: uuidv4() }
            })
        })
    } else {
        dispatch({
            type: GET_USER,
            payload: { userData: result.user }
        })
    }
}

export const logoutUserAction = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    })
}