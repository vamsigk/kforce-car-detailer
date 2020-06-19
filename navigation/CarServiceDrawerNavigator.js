import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import CarServicesBottomTabNavigator from './CarServicesBottomTabNavigator';
import Colors from '../constants/Colors';
import * as stackNavigators from './ServiceStackNavigators';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AppButton from '../components/UI/AppButton';
import * as authActions from '../redux-store/actions/AuthActions';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
    labelStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});

const CarServiceDrawerNavigator = createDrawerNavigator({
    Services: {
        screen: CarServicesBottomTabNavigator,
        navigationOptions: () => {
            return {
                title: 'Services',
                drawerIcon: (drawerConfig) => <AntDesign
                    name="car"
                    size={24}
                    color={drawerConfig.tintColor}
                />
            }
        }
    },
    UserProfile: {
        screen: stackNavigators.ProfileStackNavigator,
        navigationOptions: () => {
            return {
                title: 'Profile',
                drawerIcon: (drawerConfig) => <Entypo
                    name="user"
                    size={24}
                    color={drawerConfig.tintColor}
                />
            }
        }
    },
    Locations: {
        screen: stackNavigators.LocationsStackNavigator,
        navigationOptions: () => {
            return {
                title: 'Locations',
                drawerIcon: (drawerConfig) => <Entypo
                    name="location"
                    size={24}
                    color={drawerConfig.tintColor}
                />
            }
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.appRed,
        labelStyle: styles.labelStyle,
        itemsContainerStyle: {
            marginVertical: 30,
          }
        
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return <View styles={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <AppButton style={{ padding: 20, width: '100%' }} onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('Auth');
                }}>
                    Logout
                    </AppButton>
            </SafeAreaView>
        </View>;
    }
});


export default CarServiceDrawerNavigator;