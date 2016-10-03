/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import NavBar from './NavBar.js';
import PageAds from './PageAds.js';
import PageHome from './PageHome.js';
import PageMenu from './PageMenu.js';
import PageLocations from './PageLocations.js';
import PageList from './PageList.js';

import settings from './settings.json';

var PushNotification = require('react-native-push-notification');

class WholeFoodsCoop extends Component {

    constructor(props) {
        super(props);
        this.state = {page: 'home'};
        this.goPage = this.goPage.bind(this);
    }

    componentDidMount() {
        PushNotification.configure({
            onRegister: function(token) {
                fetch(settings.pushRegistrationURL, {
                    method: "POST",
                    body: JSON.stringify({
                        token: token,
                        platform: "android"
                    })
                });
            },
            onNotification: (n) => {
                if (n.getMessage().toLowerCase().indexOf("sale" != -1)) {
                    this.goPage('ads');
                }
            },
            senderID: settings.gcmSenderID
        });
    }

    goPage(p) {
        this.setState({page:p});
    }

    render() {
        let main;
        if (this.state.page == 'loc') {
            main = <PageLocations />
        } else if (this.state.page == 'ads') {
            main = <PageAds />
        } else if (this.state.page == 'menu') {
            main = <PageMenu />
        } else if (this.state.page == 'list') {
            main = <PageList />
        } else {
            main = <PageHome />
        }
        const {width, length} = Dimensions.get('window');

        return (
          <View style={styles.container}>
            <View style={{flex: .9, marginTop: 50}}>
                {main}
            </View>
            <View style={{flex: 0.1, backgroundColor: settings.theme.navColor, width: width}}>
                <NavBar page={this.goPage} />
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: settings.theme.backgroundColor
  },
});

AppRegistry.registerComponent('WholeFoodsCoopApp', () => WholeFoodsCoop);
