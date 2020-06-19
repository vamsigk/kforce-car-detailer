import { AsyncStorage } from 'react-native';
import Firebase from '../../constants/Firebase';
import Keys from '../../api-keys';

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const PASSWORD_RESET = "PASSWORD_RESET";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";

export const signUpUser = (email, password) => {

    console.log('signing up user' + email.toString() + password.toString());
    const signUpEndPoint = (Firebase.AuthSignUpAPI).concat(Keys.google.AuthKey);

    return async dispatch => {
        const response = await fetch(signUpEndPoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const resData = await response.json();
            const errorMessage = resData.error.message;
            console.log(errorMessage);


            let errorMessageToDisplay;
            if (errorMessage === 'EMAIL_EXISTS') {
                errorMessageToDisplay = 'Email Already exists. Please try to sign in';
            } else if (errorMessage === 'OPERATION_NOT_ALLOWED') {
                errorMessageToDisplay = 'You are performing a bad operation.';
            } else if (errorMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                errorMessageToDisplay = 'Too many attempts to sign in. Try after some time';
            }
            throw new Error(errorMessageToDisplay ? errorMessageToDisplay : 'Plroblem with signing Up.');
        }

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: SIGN_UP,
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken
        });
        //saving userid and token to storage for auto login feature
        //get current time and add it to expires time
        const tokenExpiryTime = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString();
        saveAuthDetailsToDevice(resData.idToken, resData.localId, resData.email, tokenExpiryTime);
    }
};


export const signInUser = (email, password) => {

    console.log('signing in user' + email.toString() + password.toString());
    const signInEndPoint = (Firebase.AuthSignInAPI).concat(Keys.google.AuthKey);

    return async dispatch => {
        const response = await fetch(signInEndPoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const resData = await response.json();
            const errorMessage = resData.error.message;
            console.log(errorMessage);

            let errorMessageToDisplay;
            if (errorMessage === 'EMAIL_NOT_FOUND') {
                errorMessageToDisplay = 'Email Not Found.';
            } else if (errorMessage === 'INVALID_PASSWORD') {
                errorMessageToDisplay = 'Please check your password.';
            } else if (errorMessage === 'USER_DISABLED') {
                errorMessageToDisplay = 'Account Disabled.';
            }
            throw new Error(errorMessageToDisplay ? errorMessageToDisplay : 'Plroblem with Signing In.');
        }

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: SIGN_IN,
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken
        });

        //saving userid and token to storage for auto login feature
        //get current time and add it to expire time
        const tokenExpiryTime = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString();
        saveAuthDetailsToDevice(resData.idToken, resData.localId, resData.email, tokenExpiryTime);
    }
};

export const resetPassword = (userEmail) => {

    const resetPasswordEndPoint = Firebase.ResetPwdAPI.concat(Keys.google.AuthKey);

    return async dispatch => {
        const response = await fetch(resetPasswordEndPoint,
            {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: userEmail

                })
            });

        dispatch({
            type: PASSWORD_RESET,
            reset: 'YES'
        });
    }
}

export const logout = () => {
    removeAuthDetailsFromStorage();
    return {
        type: LOG_OUT
    }

}

export const authenticateUser = (userId, token, email) => {
    return {
        type: AUTHENTICATE,
        userId: userId,
        token: token,
        email: email
    }
};

const removeAuthDetailsFromStorage = () => {
    AsyncStorage.removeItem('userData');
}

const saveAuthDetailsToDevice = (token, userId, email, expiryTime) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        email,
        expiryTime
    }));
};