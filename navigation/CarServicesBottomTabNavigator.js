import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as stackNavigators from './ServiceStackNavigators';
import Colors from '../constants/Colors';

const CarServiceBottomTabNavigator = createBottomTabNavigator({
    Favourites: {
     screen: stackNavigators.GeneralCarServicesStackNavigator,
     navigationOptions: () => {
         return {
             title: 'To Go'
         }
     }
    },
    Extras: {
        screen: stackNavigators.AdditionalCarServicesStackNavigator,
        navigationOptions: () => {
            return {
                title: 'Extras'
            }
        }
    }
    
}, {
    tabBarOptions: {
        activeTintColor: Colors.appWhite,
        tabStyle: {
            height: 50,
            alignItems: "center",
            justifyContent: "center"
        },
        style: {
            backgroundColor: Colors.appRed
            
        },
        labelStyle: {
            fontSize: 24,
            fontFamily: 'open-sans',
            paddingBottom: 5
        }
    }
});

export default CarServiceBottomTabNavigator;