import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import * as servicesActions from '../../redux-store/actions/CarServiceActions';
import { useDispatch, useSelector } from 'react-redux';

import GeneralServiceComponent from '../../components/App/GeneralServiceComponent';


const GeneralCarServicesScreen = (props) => {

    const dispatch = useDispatch();
    const generalServices = useSelector(state => state.carServiceReducer.generalServices);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    const loadGeneralServices = useCallback(async () => {
        console.log('executing loadgeneralservices');
        setIsSpinnerLoading(true);
        await dispatch(servicesActions.fetchAllServices());
        setIsSpinnerLoading(false);
    }, [dispatch, setIsSpinnerLoading])

    useEffect(() => {
        
        loadGeneralServices();
        
    }, [loadGeneralServices]);

    //refresh the products for every navigaiton cycle
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadGeneralServices);

        return () => {
            willFocusSub.remove();
        };

    }, [loadGeneralServices]);

    onNavigateServiceDetails = (service) => {
        props.navigation.navigate({
            routeName: 'CarServiceDetail',
            params: {
                service: service,
                serviceName: service.serviceName
            }
        });
    };

    if (isSpinnerLoading) {
        return <View style={styles.activityDisplay}>
                <ActivityIndicator
                    size='large'
                    color={Colors.appRed}
                />
            </View>
    }


    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '95%' }}
                data={generalServices}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => (<GeneralServiceComponent
                    service={itemData.item}
                    goToServiceDetail={onNavigateServiceDetails}
                />
                )
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.appBlack
    },
    activityDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.appBlack
    }
});

export default GeneralCarServicesScreen;
