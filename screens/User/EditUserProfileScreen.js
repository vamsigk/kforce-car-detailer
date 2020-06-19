import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from '../../components/UI/AppButton';
import Colors from '../../constants/Colors';
import User from '../../models/User';

import * as userActions from '../../redux-store/actions/UserActions';
import { useSelector, useDispatch } from 'react-redux';

const EditUserProfile = (props) => {

    const dispatch = useDispatch();
    const userEmailIdFromStore = useSelector(state => state.authReducer.email);
    const userId = useSelector(state => state.authReducer.userId);

    //below are the details from store to be filled if exists
    const firstNameFromStore = useSelector(state => state.userReducer.firstName);
    const lastNameFromStore = useSelector(state => state.userReducer.lastName);
    const mobileNumberFromStore = useSelector(state => state.userReducer.mobileNumber);

    const [firstName, setFirstName] = useState(firstNameFromStore ? firstNameFromStore : '');
    const [lastName, setLastName] = useState(lastNameFromStore ? lastNameFromStore : '');
    const [mobileNumber, setMobileNumber] = useState(mobileNumberFromStore ? mobileNumberFromStore : '');

    const onSubmitUserProfileHandler = async () => {
        const user = new User(
            userId,
            firstName,
            lastName,
            userEmailIdFromStore,
            mobileNumber
        );
        try {
            await dispatch(userActions.createOrUpdateUser(user));
            Alert.alert('Successfully Saved.', 'Thanks for creating the profile with us.');
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
        <View style={styles.screen}>
            <View style={styles.personalDetails}>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Personal Details</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formText}>First Name:</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder={'\u3000' + 'First Name'}
                        placeholderTextColor="#737373"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formText}>Last Name:</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder={'\u3000' + 'Last Name'}
                        placeholderTextColor="#737373"
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formText}>Email:</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder={'\u3000' + 'Email'}
                        placeholderTextColor="#737373"
                        value={userEmailIdFromStore}
                        editable={false}

                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formText}>Mobile Number:</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder={'\u3000' + 'Mobile Number'}
                        placeholderTextColor="#737373"
                        onChangeText={(text) => setMobileNumber(text)}
                        value={mobileNumber}
                    />
                </View>
                <AppButton onPress={onSubmitUserProfileHandler}>Submit Profile</AppButton>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.appBlack
    },
    headerTextView: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    personalDetails: {
        borderColor: Colors.appGrey,
        borderWidth: 4,
        borderRadius: 10,
        margin: 10,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        //backgroundColor: Colors.appBlack
    },
    headerText: {
        color: Colors.appYellow,
        fontFamily: 'open-sans',
        fontSize: 22
    },
    formContainer: {
        width: '90%'
    },
    formText: {
        color: Colors.appWhite,
        fontFamily: 'open-sans',
        fontSize: 18,
        margin: 5
    },
    formInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.appGrey,
        height: 30,
        width: '100%',
        margin: 5,
        backgroundColor: '#1a1a1a',
        color: Colors.appWhite,
        paddingHorizontal: 10
    }
});

export default EditUserProfile;