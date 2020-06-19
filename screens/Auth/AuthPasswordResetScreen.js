import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';

import * as authActions from '../../redux-store/actions/AuthActions';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import AppButton from '../../components/UI/AppButton';

const PasswordResetScreen = (props) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const onResetPasswordHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(authActions.resetPassword(email));
            Alert.alert('Check your email.', 'Please use the link sent to your email to reset the password.', [{
                text: 'Okay', style: 'default', onPress: () => {
                    props.navigation.navigate('Auth');
                }
            }]);

        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message, 'Please try again later', [{ text: 'Okay', style: 'default' }]);
        }
    }

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView keyboardVerticalOffset={100}>
                <ScrollView>
                    <View style={styles.authContainer}>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={'\u3000' + 'Email'}
                                placeholderTextColor="#737373"
                                value={email}
                                onChangeText={(text) => { setEmail(text) }}
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ ...styles.label, ...{ fontSize: 13 } }}>*Please use the same email used while signing up.</Text>
                        </View>
                        <View>
                            <AppButton onPress={onResetPasswordHandler}>
                                Reset Password
                        </AppButton>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* handling the activity indicator */}
            {isLoading &&
                (<View>
                    <ActivityIndicator
                        size='large'
                        color={Colors.appRed}
                    />
                </View>)
            }



        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.appBlack
    },
    authContainer: {
        borderColor: Colors.appGrey,
        borderWidth: 4,
        borderRadius: 10,
        margin: 10,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
    },
    formControl: {
        width: '100%',
        marginVertical: 10
    },
    label: {
        color: Colors.appWhite,
        fontFamily: 'open-sans',
        fontSize: 18,
        margin: 5
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.appGrey,
        height: 50,
        width: '95%',
        margin: 5,
        backgroundColor: '#1a1a1a',
        color: Colors.appWhite,
        fontSize: 18,
        paddingHorizontal: 10
    }
});

export default PasswordResetScreen;
