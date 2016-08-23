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
  Dimensions,
  PushNotificationIOS
} from 'react-native';

import NavBar from './NavBar.js';
import PageAds from './PageAds.js';
import PageHome from './PageHome.js';
import PageMenu from './PageMenu.js';
import PageLocations from './PageLocations.js';
import PageList from './PageList.js';

import settings from './settings.json';

class WholeFoodsCoop extends Component {

    constructor(props) {
        super(props);
        this.state = {page: 'home'};
    }

    componentDidMount() {
        PushNotificationIOS.addEventListener('register', function(token) {
            console.log(token);
            fetch(settings.pushRegistrationURL, {
                method: "POST",
                body: JSON.stringify({
                    token: token,
                    platform: "iOS"
                })
            });
        });
        PushNotificationIOS.addEventListener('notification', function(n) {
            console.log(n);
        });
        PushNotificationIOS.requestPermissions(); 
    }

    goHome() {
        this.setState({page: 'home'});
    }

    goLoc() {
        this.setState({page: 'loc'});
    }

    goAds() {
        this.setState({page: 'ads'});
    }
    
    goMenu() {
        this.setState({page: 'menu'});
    }

    goPage(p) {
        this.setState({page:p});
    }

    render() {
        var main;
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
        var {width, length} = Dimensions.get('window');

        return (
          <View style={styles.container}>
            <View style={{flex: .9, marginTop: 50}}>
                {main}
            </View>
            <View style={{flex: 0.1, backgroundColor: settings.theme.navColor, width: width}}>
                <NavBar 
                    home={this.goHome.bind(this)} 
                    loc={this.goLoc.bind(this)} 
                    ads={this.goAds.bind(this)} 
                    menu={this.goMenu.bind(this)} 
                    page={this.goPage.bind(this)}
                />
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
