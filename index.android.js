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
  ScrollView
} from 'react-native';

import NavBar from './NavBar.js';
import PageAds from './PageAds.js';
import PageHome from './PageHome.js';
import PageMenu from './PageMenu.js';
import PageLocations from './PageLocations.js';

class AwesomeProject extends Component {

    constructor(props) {
        super(props);
        this.state = {page: 'home'};
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

    render() {
        var main;
        if (this.state.page == 'loc') {
            main = <PageLocations />
        } else if (this.state.page == 'ads') {
            main = <PageAds />
        } else if (this.state.page == 'menu') {
            main = <PageMenu />
        } else {
            main = <PageHome />
        }

        return (
          <View style={styles.container}>
            <View style={{flex: .9, marginTop: 50}}>
                {main}
            </View>
            <View style={{flex: 0.1}}>
                <NavBar 
                    home={this.goHome.bind(this)} 
                    loc={this.goLoc.bind(this)} 
                    ads={this.goAds.bind(this)} 
                    menu={this.goMenu.bind(this)} 
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
    backgroundColor: '#70DB70',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
