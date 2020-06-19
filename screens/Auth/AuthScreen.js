import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../redux-store/actions/AuthActions';
import AppButton from '../../components/UI/AppButton';

const AuthScreen = (props) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginScreen, setIsLoginScreen] = useState(true);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignUpHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(authActions.signUpUser(email, password));
            setIsLoginScreen(true);
            setIsLoading(false);
            setEmail('');
            setPassword('');
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message, 'Please try again later', [{ text: 'Okay', style: 'default' }]);
        }

    }

    const onSignInHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(authActions.signInUser(email, password));
            props.navigation.navigate('AllServices');
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
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Password:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={'\u3000' + 'Password'}
                                placeholderTextColor="#737373"
                                value={password}
                                onChangeText={(text) => { setPassword(text) }}
                                keyboardType="default"
                                secureTextEntry={true}
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            {isLoginScreen && <AppButton onPress={onSignInHandler}>
                                LOGIN
                            </AppButton>}

                         
                                {isLoginScreen && <TouchableOpacity onPress={() => { setIsLoginScreen(false) }}>
                                    <Text style={{...styles.noAccountText, ...{fontFamily: 'open-sans', fontSize: 16 }}}>Don't have an account ?</Text>
                                </TouchableOpacity>}
                                {isLoginScreen && <TouchableOpacity onPress={() => { props.navigation.navigate('ForgotPassword') }}>
                                    <Text style={{...styles.noAccountText, ...{fontFamily: 'open-sans', fontSize: 16 }}}>Reset Password</Text>
                                </TouchableOpacity>}
                           

                            {!isLoginScreen && <AppButton onPress={onSignUpHandler}>
                                SIGN UP
                            </AppButton>}
                            {!isLoginScreen && <TouchableOpacity onPress={() => { setIsLoginScreen(true) }}>
                                <Text style={styles.noAccountText}>Back to Login Screen.</Text>
                            </TouchableOpacity>}
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
    buttonContainer: {
        margin: 10,
        padding: 10,
        //width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 100
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
    },
    noAccountText: {
        color: Colors.appRed,
        textDecorationLine: 'underline',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        margin: 10
    },
    regiterAndReset: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    }
});

export default AuthScreen;