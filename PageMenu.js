
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ListView,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import settings from './settings.json';

const styles = StyleSheet.create({
    date: {
        color: settings.menu.dateColor
    },
    time: {
        paddingLeft: 7,
        color: settings.menu.timeColor
    },
    item: {
        paddingLeft: 12,
    },
    box: {
        padding: 5,
        margin: 5,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3
    }
});

export default class PageMenu extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(["Loading"]),
            list: ["Loading"]
        }
    }

    componentDidMount() {
        fetch('http://store.wholefoods.coop/api/menu/')
            .then((response) => response.json())
            .then((responseJSON) => {
                const list = Object.keys(responseJSON).map(k => responseJSON[k]);
                this.setState({
                    dataSource: this.ds.cloneWithRows(list),
                    list: list
                });
            })
            .catch(error => console.log(error)); 
    }

    itemRow(row) {
        if (!row.items) {
            return (<Text>Loading</Text>);
        }
        return (
            <View>
            <View style={styles.box}>
                <Text style={styles.date}>{row.date}</Text>
                {row.items.map(item => {
                    const isTime = (item.indexOf('AM') > -1 || item.indexOf('PM') > -1);
                    const id = row.date + '::' + item;
                    return (
                        <Text 
                            style={isTime ? styles.time : styles.item}
                            key={id}
                        >
                        {item}</Text>
                    );
                })}
            </View>
            <View style={{height:5}}></View>
            </View>
        );
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}
                onLayout={() => this.setState({dataSource:this.ds.cloneWithRows(this.state.list)})}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.itemRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}
