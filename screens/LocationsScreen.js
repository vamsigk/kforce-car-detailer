import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as locationsActions from '../redux-store/actions/LocationActions';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';

import LocationComponent from '../components/App/LocationComponent';

import MapView, { Marker } from 'react-native-maps';

const LocationsScreen = () => {

    const dispatch = useDispatch();
    const locationsToDisplay = useSelector(state => state.locationreducer.locations);
    const [selectedLocation, setSelectedLocation] = useState(locationsToDisplay.find(location => location.id === 1));
    const [initRegion, setInitRegion] = useState({
        latitude: 17.449,
        longitude: 78.379,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
    });

    const loadLocations = useCallback(async () => {
        await dispatch(locationsActions.fetchLocations());
    }, [dispatch]);

    useEffect(() => {
        loadLocations();
    }, [loadLocations]);

    const selectlocationHandler = (locationId) => {
        const currentLocation = locationsToDisplay.find(location => location.id === locationId);
        setSelectedLocation(currentLocation);
    };

    return (
        <View style={styles.screen}>
            <MapView initialRegion={initRegion} style={styles.mapView} showsUserLocation={true} onRegionChange={region => setInitRegion(region)}>
                {locationsToDisplay.map((location) => (<Marker
                    key={location.locationName}
                    title={'Kforce ' + location.locationName}
                    coordinate={location.coordinate}
                    onPress={selectlocationHandler.bind(this, location.id)}
                />))}
            </MapView>
            {selectedLocation ?
                <LocationComponent selectedLocation={selectedLocation}/> :
                <Text style={{ ...styles.addressText, ...{ margin: 10 } }}>*Please tap on your nearest location to view the details.</Text>
            }
        </View>)
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.appBlack,
        width: '100%'
    },
    mapView: {
        flex: 0.60,
        backgroundColor: Colors.appWhite,
        width: '100%'
    },
    addressText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.appWhite
    }
});

export default LocationsScreen;