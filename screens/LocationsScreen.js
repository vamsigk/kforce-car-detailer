import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as locationsActions from '../redux-store/actions/LocationActions';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const LocationsScreen = () => {

    const dispatch = useDispatch();
    const locationsToDisplay = useSelector(state => state.locationreducer.locations);

    const loadLocations = useCallback(async () => {
        await dispatch(locationsActions.fetchLocations());
    }, [dispatch]);

    useEffect(() => {
        loadLocations();
    }, [loadLocations]);

    return (
        <View style={styles.screen}>
            <FlatList
                data={locationsToDisplay}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) =>
                    <View style={styles.locationView}>
                        <Text style={styles.locationNameText}>{itemData.item.locationName}</Text>
                        <Text style={styles.addressText}>{itemData.item.addressLineOne}</Text>
                        <Text style={styles.addressText}>{itemData.item.addressLineTwo}</Text>
                        <Text style={styles.addressText}>{itemData.item.city}</Text>
                        <Text style={styles.addressText}>{itemData.item.state}</Text>
                        <Text style={styles.addressText}>{itemData.item.zipcode}</Text>
                        <Text style={styles.addressText}>{itemData.item.country}</Text>

                        <View style={styles.contactNumberView}>
                            <Entypo name="old-phone" size={18} color={Colors.appRed} style={{ marginRight: 10 }} />
                            <Text style={styles.locationContactNumber}>
                                {itemData.item.phoneNumber}
                            </Text>
                        </View>
                        
                        <View style={styles.contactNumberView}>
                            <Entypo name="mobile" size={18} color={Colors.appRed} style={{ marginRight: 10 }} />
                            <Text style={styles.locationContactNumber}>
                                {itemData.item.mobileNumber}
                            </Text>
                        </View>

                        <View style={styles.contactNumberView}>
                        <MaterialIcons name="email" size={18} color={Colors.appRed} style={{ marginRight: 10 }}/>
                            <Text style={styles.locationContactNumber}>
                                {itemData.item.emailId}
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>)
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: Colors.appBlack
    },
    locationView: {
        borderColor: Colors.appGrey,
        borderRadius: 10,
        borderWidth: 2,
        padding: 20,
        margin: 10
    },
    addressText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.appWhite
    },
    locationNameText: {
        fontFamily: 'open-sans',
        fontSize: 22,
        color: Colors.appYellow
    },
    contactNumberView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    locationContactNumber: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.appRed
    }
});

export default LocationsScreen;