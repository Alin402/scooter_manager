import {
    ADD_ALERT,
    REMOVE_ALERT
} from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const addAlert = ({ type, msg }) => dispatch => {
    let ID = uuidv4();
    dispatch({
        type: ADD_ALERT,
        payload: {
            ID,
            type,
            msg
        }
    })
}

export const removeAlert = (alertID) => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: alertID
    });
}