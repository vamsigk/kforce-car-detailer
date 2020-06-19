import React, {useCallback, useEffect} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import AdditionalServiceComponent from '../../components/App/AdditionalServiceComponent';
import { useSelector, useDispatch } from 'react-redux'

const AdditionalCarServicesScreen = () => { const dispatch = useDispatch();
    const additionalServices = useSelector(state => state.carServiceReducer.additionalServices);


    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '100%' }}
                data={additionalServices}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => (<AdditionalServiceComponent 
                    service={itemData.item}
                    />
                    )
                }
            />
        </View>
    )};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.appBlack
    }
});

export default AdditionalCarServicesScreen;
