
import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    ListView,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';

export default class PageAds extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            images: [],
            level: 'top'
        };
    }

    getImagesAsync() {
        return fetch('http://store.wholefoods.coop/api/flyers/')
            .then((response) => response.json())
            .then((responseJSON) => {
                var covers = responseJSON.map((imgs) => imgs[0]);
                this.setState({
                    dataSource: this.ds.cloneWithRows(covers),
                    images: responseJSON,
                    level: 'top'
                });
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getImagesAsync();
    }

    goToTop() {
        var covers = this.state.images.map((i) => i[0]);
        this.setState({
            dataSource: this.ds.cloneWithRows(covers),
            level: 'top'
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
            level: 'sub'
        }); 
    }

    renderImg(url) {
        var {width, height} = Dimensions.get('window');
        var w = width - 50;
        var h = Math.round(w * (11.0/8.5));
        if (this.state.level == 'top') {
            return (
                <TouchableHighlight onPress={() => this.goDownLevel(url)}>
                    <Image
                        style={{width: w, height: h}}
                        source={{uri: url}}
                        resizeMode="contain"
                    />
                </TouchableHighlight>
            );
        } else if (url == 'Go Back') {
            return (
                <TouchableHighlight onPress={this.goToTop.bind(this)}>
                    <Text>{url}</Text>
                </TouchableHighlight>
            );
        } else {
            return (
                <View>
                <Image
                    style={{width: w, height: h, padding: 5}}
                    source={{uri: url}}
                    resizeMode="contain"
                />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text>Current Sales Flyers</Text>
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

