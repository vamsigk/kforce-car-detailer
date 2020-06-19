import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';


const GServiceDetailsScreen = (props) => {

    const service = props.navigation.getParam('service');
    const serviceDetails = service.serviceDetails;
    const priceItems = service.priceItems;


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>Treatment of the vehicle includes:</Text>
                </View>

                <View style={styles.details}>
                    {serviceDetails.map((item, index) =>
                        <View style={styles.detailsView} key={index}>
                            <View style={styles.bulletView}>
                                <Text style={styles.detailText}>{'\u2022'}</Text>
                            </View>
                            <View style={styles.detailTextView}>
                                <Text style={styles.detailText}>{item}</Text>
                            </View>
                        </View>
                    )}

                </View>
                <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>Prices for each vehicle category:</Text>
                </View>


                <View>
                    {priceItems.map((item, index) =>
                        <View style={styles.priceContainer} key={index}>
                            <View style={styles.priceCategory}>
                                <Text style={styles.vehicleCategoryPriceText}>{item.vehicleCategory}</Text>
                            </View>
                            <View style={styles.actualPrice}>
                                <Text style={styles.vehicleCategoryPriceText}>{'\u20B9'} {item.price}</Text>
                            </View>
                        </View>)}

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        //flex: 1,
        flexGrow: 1,
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.appBlack,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    headingTextContainer: {
        margin: 10
    },
    details: {
        marginBottom: 20
    },
    detailsView: {
        flexDirection: 'row'
    },  
    bulletView: {
        width: '5%'
    },
    detailTextView: {
        width: '95%'
    },
    detailText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.appWhite
    },
    headingText: {
        fontFamily: 'open-sans',
        fontSize: 22,
        color: Colors.appYellow
    },
    priceContainer: {
        flexDirection: 'row',
        width: "70%",
        margin: 5,
        padding: 5,
        borderBottomColor: Colors.appGrey,
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    priceCategory: {
        width: "50%",
        alignItems: 'flex-start'
    },
    actualPrice: {
        width: "50%",
        alignItems: 'flex-end'
    },
    vehicleCategoryPriceText: {
        color: Colors.appWhite,
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default GServiceDetailsScreen;