
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

import settings from './settings.json';

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
        var ph = settings.home.phone.substring(0, 2) !== "1-" ? "1-" + settings.home.phone : settings.phone.home;
        var web = settings.home.website.substring(0, 4) !== "http" ? "http://" + settings.home.website : settings.home.website;
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require("./img/logo.png")}
                    style={[styles.logo, {width: w, height: h}]}
                    resizeMode="contain"
                />
                <View style={styles.subBox}>
                    <Text>{settings.home.slogan}</Text>
                    <TouchableHighlight 
                     onPress={() => Linking.openURL('tel:' + ph).catch(err => console.log(err))}>
                        <Text style={styles.link}>{ph}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                     onPress={() => Linking.openURL(web).catch(err => console.log(err))}>
                        <Text style={styles.link}>{web}</Text>
                    </TouchableHighlight>
                    <Text>Open 7am - 9pm</Text>
                    <Text>Beta!</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text>Feedback:</Text>
                        <TouchableHighlight
                         onPress={() => Linking.openURL('mailto:' + settings.home.feedback).catch(err => console.log(err))}>
                            <Text style={styles.link}>{settings.home.feedback}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
