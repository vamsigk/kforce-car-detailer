import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';

import * as authActions from '../redux-store/actions/AuthActions';
import { useDispatch } from 'react-redux';

const StartUpScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            console.log('Inside use effect startup screen');
            //retrieving the user data saved while logging in or signing up
            const userData = await AsyncStorage.getItem('userData');
            console.log('Printing user data details ...' + JSON.stringify(userData));
            //if user data is not found navigate to auth screen
            if (!userData) {
                //returning to authenctication stack
                console.log('Inside Step One return');
                props.navigation.navigate('Authentication');
                return;
            }
            //retrieving the token, userID, expiryData, email from userdata string
            const transformedData = JSON.parse(userData);
            const { token, userId, email, expiryTime } = transformedData;

            const newTokenExpiryTime = new Date(expiryTime);

            if (newTokenExpiryTime <= new Date() || !token || !userId || !email) {
                console.log('Inside Step Two return');
                //returning to authenctication stack if eiter of the userdata is invalid
                props.navigation.navigate('Authentication');
                return;
            }
            props.navigation.navigate('AllServices');
            dispatch(authActions.authenticateUser(userId, token, email));

        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.activityDisplay}>
            <ActivityIndicator
                size='large'
                color={Colors.appRed}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    activityDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.appBlack
    }
});

export default StartUpScreen;