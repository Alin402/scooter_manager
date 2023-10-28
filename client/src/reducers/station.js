import {
    GET_STATIONS,
    ADD_STATION
} from "../actions/types";

const initialState = {
    stations: [],
    selectedStation: {}
};

const station = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATIONS:
            return { ...state, stations: action.payload }
        case GET_STATIONS:
            return { ...state, stations: [...state.stations, action.payload] }
        default:
            return state;
    }
};

export default station;