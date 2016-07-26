
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Linking
} from 'react-native';

var styles = StyleSheet.create({
    logo: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5
    },
    subBox: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        alignItems: 'center',
        marginTop: 10,
        padding: 5,
        backgroundColor: '#fff',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});

export default class PageHome extends Component {
    render() {
        var {width, height} = Dimensions.get('window');
        var w = width - 20;
        var h = w * (632/620);
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require('./img/wfc-app-logo.png')} 
                    style={[styles.logo, {width: w, height: h}]}
                    resizeMode="contain"
                />
                <View style={styles.subBox}>
                    <Text>Duluth's Co-op Since 1970</Text>
                    <TouchableHighlight 
                     onPress={() => Linking.openURL('tel:1-218-728-0884').catch(err => console.log(err))}>
                        <Text style={styles.link}>218-728-0884</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                     onPress={() => Linking.openURL('http://wholefoods.coop').catch(err => console.log(err))}>
                        <Text style={styles.link}>www.wholefoods.coop</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
