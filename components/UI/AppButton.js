import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const AppButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} {...props}>
            <View style={{...styles.button, ...props.style}} >
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.appRed,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        minWidth: 100
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default AppButton;