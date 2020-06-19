import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const GeneralServiceComponent = (props) => {

    const serviceToDisplay = props.service;

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={props.goToServiceDetail.bind(this, serviceToDisplay)}>
                <View style={styles.serviceContainer}>
                    <View style={styles.serviceDescription}>
                        <Text style={styles.serviceName}>{serviceToDisplay.serviceName}</Text>
                        <Text style={styles.servicePriceLabel}>Starts from {'\u20B9'}{serviceToDisplay.serviceStartPrice}</Text>
                    </View>
                    <View style={styles.serviceForwardIcon}>
                        <Ionicons name="ios-arrow-forward" size={25} color={Colors.appYellow} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        borderBottomColor: Colors.appGrey,
        borderBottomWidth: 1,
    },
    serviceContainer: {
        flexDirection: 'row',
        width: "95%",
        margin: 5,
        padding: 20
    },
    serviceName: {
        fontSize: 25,
        color: Colors.appYellow,
    },
    servicePriceLabel: {
        fontSize: 15,
        color: Colors.appWhite,
    },
    serviceDescription: {
        width: "95%"
    },
    serviceForwardIcon: {
        width: "5%"
    }
});

export default GeneralServiceComponent;