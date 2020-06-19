import { FETCH_SERVICES } from "../actions/CarServiceActions";

const initialState = {
    generalServices: [],
    additionalServices: []
};

const CarServicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SERVICES:
            return {
                generalServices: action.generalServices,
                additionalServices: action.additionalServices
            };
        default:
            return state;    

    }
};

export default CarServicesReducer;