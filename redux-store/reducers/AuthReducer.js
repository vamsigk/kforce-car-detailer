import { SIGN_UP, SIGN_IN, PASSWORD_RESET, LOG_OUT, AUTHENTICATE } from "../actions/AuthActions";

const initialState = {
    email: null,
    token: null,
    userId: null,
    pwdReset: ''
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                email: action.email,
                token: action.token,
                userId: action.userId
            };
        case SIGN_IN:
            return {
                ...state,
                email: action.email,
                token: action.token,
                userId: action.userId
            }
        case PASSWORD_RESET:
            return {
                ...state,
                pwdReset: action.reset
            }
        case LOG_OUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: null
            }
        case AUTHENTICATE:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                email: action.email
            }
        default:
            return state;
    }
};

export default AuthReducer;