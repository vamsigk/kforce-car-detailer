import { SET_LOCATIONS } from "../actions/LocationActions"

const initialState = {
    locations: []
}

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOCATIONS:
            return {
                locations: action.locations
            }; 
        default:
            return state;    
    }
}

export default locationReducer;