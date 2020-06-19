import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import * as stackNavigators from './ServiceStackNavigators';
import CarServiceDrawerNavigator from './CarServiceDrawerNavigator';
import CarServiceBottomTabNavigator from './CarServicesBottomTabNavigator';
import StartUpScreen from '../screens/StartUpScreen';

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Authentication: stackNavigators.AuthStackNavigator,
    AllServices: CarServiceDrawerNavigator,
    CarServices: CarServiceBottomTabNavigator
});



const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;