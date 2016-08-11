
import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    ListView,
    Dimensions,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import settings from './settings.json';

var styles = StyleSheet.create({
    backBtn: {
        fontSize: 20
    },
    loading: {
        fontSize: 20
    }
});

export default class PageAds extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(["Loading"]),
            images: [],
            level: 'top',
            currentList: []
        };
    }

    getImagesAsync() {
        return fetch(settings.sales.apiURL)
            .then((response) => response.json())
            .then((responseJSON) => {
                var covers = responseJSON.map((imgs) => imgs[0]);
                this.setState({
                    dataSource: this.ds.cloneWithRows(covers),
                    images: responseJSON,
                    level: 'top',
                    currentList: covers
                });
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getImagesAsync();
    }

    reOrient() {
        /**
          Hack. State needs to change to trigger
          re-rendering the ListView so swap in an
          empty list then the current list again
        */
        var cur = this.state.currentList;
        this.setState({
            dataSource: this.ds.cloneWithRows([])
        });
        this.setState({
            dataSource: this.ds.cloneWithRows(cur)
        });  
    }

    goToTop() {
        var covers = this.state.images.map((i) => i[0]);
        this.setState({
            dataSource: this.ds.cloneWithRows(covers),
            level: 'top',
            currentList: covers
        });
    }

    goDownLevel(url) {
        var list = ['Go Back'];
        for (var i=0; i<this.state.images.length; i++) {
            if (this.state.images[i][0] == url) {
                for (var j=0; j<this.state.images[i].length; j++) {
                    list.push(this.state.images[i][j]);
                }
            }
        }
        list.push('Go Back');
        this.setState({
            dataSource: this.ds.cloneWithRows(list),
            level: 'sub',
            currentList: list
        }); 
    }

    textToIcon(text) {
        if (text == 'Go Back') {
            return (
                <TouchableHighlight onPress={this.goToTop.bind(this)}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Icon name="chevron-left" size={20} />
                        <Text style={styles.backBtn}> {text}</Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (
                <View>
                    <Text style={styles.loading}>{text}</Text>
                </View>
            );
        }
    } 

    renderImg(url) {
        var {width, height} = Dimensions.get('window');
        var w = width - 50;
        var h = Math.round(w * (11.0/8.5));
        if (url.substring(0,4) == 'http' && this.state.level == 'top') {
            return (
                <TouchableHighlight onPress={() => this.goDownLevel(url)} style={{marginBottom: 5}}>
                    <Image
                        style={{width: w, height: h, margin: 5, padding: 5}}
                        source={{uri: url}}
                        resizeMode="contain"
                        indicator={ProgressBar}
                    />
                </TouchableHighlight>
            );
        } else if (url.substring(0,4) != 'http') {
            return this.textToIcon(url);
        } else {
            return (
                <View>
                <Image
                    style={{width: w, height: h, padding: 5, margin: 5}}
                    source={{uri: url}}
                    resizeMode="contain"
                    indicator={ProgressBar}
                />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}
                onLayout={this.reOrient.bind(this)}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderImg.bind(this)}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}

