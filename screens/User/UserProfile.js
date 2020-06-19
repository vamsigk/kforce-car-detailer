import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import AppButton from '../../components/UI/AppButton';
import EditUserProfile from './EditUserProfileScreen';

import * as userActions from '../../redux-store/actions/UserActions';

import { useSelector, useDispatch } from 'react-redux';

const UserProfileScreen = (props) => {

    const dispatch = useDispatch();

    const userEmailIdFromStore = useSelector(state => state.authReducer.email);
    const mobileNumberFromUserStore = useSelector(state => state.userReducer.mobileNumber);

    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    const loadUser = useCallback(async () => {

        console.log('Executing load user...');
        setIsSpinnerLoading(true);
        await dispatch(userActions.getUser());
        setIsSpinnerLoading(false);
        console.log('Printing Email from the store .. ' + userEmailIdFromStore);
        console.log('Printing Mobile number from the store .. ' + mobileNumberFromUserStore);
    }, [dispatch])

    //refresh the user for every navigaiton cycle
    useEffect(() => {
        console.log('Executing will focus');
        const willFocusSub = props.navigation.addListener('willFocus', loadUser);

        return () => {
            console.log('removing...');
            
            willFocusSub.remove();
        };
    }, [loadUser, setIsSpinnerLoading]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);


    if (isSpinnerLoading) {
        return (
            <View style={styles.activityDisplay}>
                <ActivityIndicator
                    size='large'
                    color={Colors.appRed}
                />
            </View>)
    }



    return (
        <View style={styles.profileContainer}>
            { (mobileNumberFromUserStore === null) && (userEmailIdFromStore !== null) && <View style={styles.noProfileView}>
                <Text style={styles.formText}>You don't have a profile. Please create.</Text>
                <AppButton onPress={() => props.navigation.navigate('EditUserProfile')}>Create Profile</AppButton>
            </View>}


            {(mobileNumberFromUserStore !== null) && (userEmailIdFromStore !== null ) && <EditUserProfile
                userEmailIdFromStore={userEmailIdFromStore}
                mobileNumberFromUserStore={mobileNumberFromUserStore}
            />}
        </View>
    )
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.appBlack
    },
    noProfileView: {
        flex: 0.25,
        padding: 5,
        borderColor: Colors.appGrey,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30
    },
    activityDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.appBlack
    },
    formText: {
        color: Colors.appWhite,
        fontFamily: 'open-sans',
        fontSize: 18,
        margin: 5
    }
});

export default UserProfileScreen;