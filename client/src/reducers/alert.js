import {
    ADD_ALERT,
    REMOVE_ALERT
} from "../actions/types";

const initialState = [];

const alert = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.ID !== action.payload);
        default:
            return state;
    }
};

export default alert;