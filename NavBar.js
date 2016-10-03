
import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import settings from './settings.json';

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        borderStyle: 'solid',
        margin: 3,
        padding: 3,
        flex: 1,
        alignItems: 'center',
        backgroundColor: settings.theme.navButtonColor
    }
});

export default class NavBar extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight style={styles.btn}
                    onPress={()=>this.props.page('home')}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon name="home" size={20} color="#fff" />
                        <Text style={{color:'#fff'}}>Home</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn}
                    onPress={()=>this.props.page('loc')}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon name="globe" size={20} color="#fff" />
                        <Text style={{color:'#fff'}}>Stores</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn}
                    onPress={()=>this.props.page('ads')}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon name="usd" size={20} color="#fff" />
                        <Text style={{color:'#fff'}}>Sales</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn}
                    onPress={()=>this.props.page('menu')}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon name="cutlery" size={20} color="#fff" />
                        <Text style={{color:'#fff'}}>Menu</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btn}
                    onPress={()=>this.props.page('list')}
                    >
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon name="list" size={20} color="#fff" />
                        <Text style={{color:'#fff'}}>List</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

