import {
    GET_STATIONS,
    ADD_ALERT,
    ADD_STATION
} from "./types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getStations = () => async dispatch => {
    try {
        const result = await axios.get("http://localhost:5000/api/station", {
            headers: {
                "token": localStorage.getItem("token")
            }
        }) || {};
        dispatch({
            type: GET_STATIONS,
            payload: result.data.stations
        })
    } catch (error) {
        console.error(error);
    }
}

export const addStation = (formData) => async dispatch => {
    try {
        const result = await axios.post("http://localhost:5000/api/station", formData, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }) || {};
        dispatch({
            type: ADD_STATION,
            payload: result.data.station
        })

        dispatch({
            type: ADD_ALERT,
            payload: { type: "success", msg: "Station successfully added", ID: uuidv4() }
        })
    } catch (error) {
        const errors = error.response.data.errors;
        console.log(error)
        errors.forEach(error => {
            dispatch({
                type: ADD_ALERT,
                payload: { type: "error", msg: error.msg, ID: uuidv4() }
            })
        })
        console.error(error);
    }
}