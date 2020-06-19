import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const LcoationComponent = (props) => {

    const selectedLocation = props.selectedLocation;

    return (
        <View style={styles.locationView}>
            <Text style={styles.locationNameText}>{selectedLocation.locationName}</Text>
            <Text style={styles.addressText}>{selectedLocation.addressLineOne}</Text>
            <Text style={styles.addressText}>{selectedLocation.addressLineTwo}</Text>
            <Text style={styles.addressText}>{selectedLocation.city}</Text>
            <Text style={styles.addressText}>{selectedLocation.state}</Text>
            <Text style={styles.addressText}>{selectedLocation.zipcode}</Text>
            <Text style={styles.addressText}>{selectedLocation.country}</Text>

            <View style={styles.contactNumberView}>
                <Entypo name="old-phone" size={18} color={Colors.appRed} style={{ marginRight: 10 }} />
                <Text style={styles.locationContactNumber}>
                    {selectedLocation.phoneNumber}
                </Text>
            </View>

            <View style={styles.contactNumberView}>
                <Entypo name="mobile" size={18} color={Colors.appRed} style={{ marginRight: 10 }} />
                <Text style={styles.locationContactNumber}>
                    {selectedLocation.mobileNumber}
                </Text>
            </View>

            <View style={styles.contactNumberView}>
                <MaterialIcons name="email" size={18} color={Colors.appRed} style={{ marginRight: 10 }} />
                <Text style={styles.locationContactNumber}>
                    {selectedLocation.emailId}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationView: {
        borderColor: Colors.appGrey,
        borderRadius: 10,
        borderWidth: 2,
        padding: 20,
        margin: 10,
        flex: 0.4,
        width: '90%'
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
})

export default LcoationComponent;