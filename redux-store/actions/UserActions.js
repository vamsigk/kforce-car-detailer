import Firebase from '../../constants/Firebase';

export const CREATE_UPDATE_USER = 'CREATE_UPDATE_USER';
export const SET_USER = 'SET_USER';


export const createOrUpdateUser = (user) => {
    return async (dispatch, getState) => {
        const userId = getState().authReducer.userId;
        const userEndPoint = Firebase.UsersURL.concat(userId).concat('.json?key=').concat(Firebase.AuthKey);

        const response = await fetch(userEndPoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                mobileNumber: user.mobileNumber
            })
        });

        if (!response.ok) {
            throw new Error('User profile could not be updated or created');
        }

        dispatch({
            type: CREATE_UPDATE_USER,
            userData: user
        });
    }
};

export const getUser = () => {
    console.log('Executing get user');
    return async (dispatch, getState) => {

        const userId = getState().authReducer.userId;
        const userEndPoint = Firebase.UsersURL.concat(userId).concat('.json?key=').concat(Firebase.AuthKey);

        const response = await fetch(userEndPoint);
        
        if (response.ok) {
            const userData = await response.json();
            if (userData) {
                console.log('dispatching......user data');
                dispatch({
                    type: SET_USER,
                    userData: userData
                })
            }
        }
    }
}