import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AdditionalCarServicesScreen from '../screens/CarServices/AdditionalCarServicesScreen';
import CustomeHeaderButton from '../components/UI/CustomeHeaderButton';
import Colors from '../constants/Colors';
import LocationsScreen from '../screens/LocationsScreen';
import GeneralCarServicesScreen from '../screens/CarServices/GeneralCarServicesScreen';
import GServiceDetailsScreen from '../screens/CarServices/GeneralServiceDetailScreen';
import UserProfileScreen from '../screens/User/UserProfile';
import AuthScreen from '../screens/Auth/AuthScreen';
import EditUserProfile from '../screens/User/EditUserProfileScreen';
import PasswordResetScreen from '../screens/Auth/AuthPasswordResetScreen';

const defaultNavigationsOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.appRed
        },
        headerTintColor: Colors.appWhite,
        headerTitleStyle: {
            fontFamily: 'open-sans',
            fontSize: 24,
            color: Colors.appWhite
        }
    }
};


export const AuthStackNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Login'
            }
        }
    },
    ForgotPassword: {
        screen: PasswordResetScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Reset Password'
            }
        }
    }
}, defaultNavigationsOptions);


export const LocationsStackNavigator = createStackNavigator({
    Locations: {
        screen: LocationsScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Locations',
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
                    <Item title='Menu'
                        iconName='ios-menu'
                        onPress={() => {navigationData.navigation.toggleDrawer()}} />
                </HeaderButtons>)
            }
        }
    }
}, defaultNavigationsOptions);



export const ProfileStackNavigator = createStackNavigator({
    UserProfile: {
        screen: UserProfileScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Profile',
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
                    <Item title='Menu'
                        iconName='ios-menu'
                        onPress={() => {navigationData.navigation.toggleDrawer()}} />
                </HeaderButtons>)
            }
        }
    },
    EditUserProfile: {
        screen: EditUserProfile,
        navigationOptions: (navigationData) => {
            return {
                title: 'Info'
            }
        }
    }
}, defaultNavigationsOptions);





export const AdditionalCarServicesStackNavigator = createStackNavigator({
    AdditionalCarServices: {
        screen: AdditionalCarServicesScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Services',
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
                    <Item title='Menu'
                        iconName='ios-menu'
                        onPress={() => {navigationData.navigation.toggleDrawer()}} />
                </HeaderButtons>
                )
            }
        }
    }
}, 
defaultNavigationsOptions);

export const GeneralCarServicesStackNavigator = createStackNavigator({
    CarServices: {
        screen: GeneralCarServicesScreen,
        navigationOptions: (navigationData) => {
            return {
                title: 'Services',
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
                    <Item title='Menu'
                        iconName='ios-menu'
                        onPress={() => {navigationData.navigation.toggleDrawer()}}
                         />
                </HeaderButtons>

                )
            }
        }
    },
    CarServiceDetail: {
        screen: GServiceDetailsScreen,
        navigationOptions: (navigationData) => {
            return {
                title: navigationData.navigation.getParam('serviceName')
            }
        }
    }
}, 
defaultNavigationsOptions);

