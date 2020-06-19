import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomeHeaderButton = (props) => {
    return (
        <HeaderButton 
        {...props}  
        IconComponent={Ionicons}
        iconSize={30}
        color='white'
        />
    );
}

export default CustomeHeaderButton;