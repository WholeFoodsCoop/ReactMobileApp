
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

export default class PageHome extends Component {
    render() {
        return (
            <View>
                <Image source={require('./img/wfc-logo.png')} 
                    style={{width:250}}/>
            </View>
        );
    }
}
