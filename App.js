import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { enableScreens } from 'react-native-screens'

import * as Font from 'expo-font'
import { AppLoading, SplashScreen} from 'expo';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';


import CarServicesReducer from './redux-store/reducers/CarServiceReducer';
import LocationReducer from './redux-store/reducers/LocationReducer';
import AuthReducer from './redux-store/reducers/AuthReducer';
import UserReducer from './redux-store/reducers/UserReducer';

enableScreens();


const rootReducer = combineReducers({
  carServiceReducer: CarServicesReducer,
  locationreducer: LocationReducer,
  authReducer: AuthReducer,
  userReducer: UserReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);



  if (!fontLoaded) {
    return <AppLoading
      onFinish={() => { setFontLoaded(true) }}
      startAsync={fetchFonts}
    />
  }


  return (
    <Provider store={store}>
      <AppNavigator style={styles.container} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
