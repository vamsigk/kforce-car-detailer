import { CREATE_UPDATE_USER, SET_USER } from "../actions/UserActions";

const initialState = {
    id: null,
    emailId: null,
    mobileNumber: null,
    firstName: null,
    lastName: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UPDATE_USER:
            return {
                id: action.userData.id,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                emailId: action.userData.emailId,
                mobileNumber: action.userData.mobileNumber
            }
        case SET_USER:
            return {
                id: action.userData.id,
                emailId: action.userData.emailId,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                mobileNumber: action.userData.mobileNumber
            }
        default:
            return state
    }
}

export default UserReducer;