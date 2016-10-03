
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ListView,
    Dimensions,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Autocomplete from 'react-native-autocomplete-input';
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
    },
    list: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        flex: 4,
        marginTop: 75,
        marginLeft: 5,
        marginRight: 5,
        padding: 3
    }
});

export default class PageList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.saveTimeout = false;
        this.state = {
            list: [],
            dataSource: this.ds.cloneWithRows([]),
            acItems: [],
            query: ""
        }
    }

    componentDidMount() {
        try {
            AsyncStorage.getItem('@WfcApp:list').then((saved)=> {
                const json = JSON.parse(saved);
                if (Array.isArray(json)) {
                    this.setState({
                        list: json,
                        dataSource: this.ds.cloneWithRows(json)
                    });
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
    }

    saveList(list) {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        } 
        this.saveTimeout = setTimeout(() => {
            try {
                AsyncStorage.setItem('@WfcApp:list', JSON.stringify(list));
            } catch (err) {
                console.log(err);
            }
        }, 1000);
    }

    search(term) {
        this.setState({query: term});
        if (term.length < 3) {
            this.setState({acItems: []});
            return;
        }
        fetch('http://store.wholefoods.coop/api/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({upc: term})
        }).then((response) => {
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.length > 20) {
                responseJSON = responseJSON.slice(0, 20);
            }
            if (this.state.query == term) {
                this.setState({ acItems: responseJSON });
            }
        })
        .catch((error) => console.log(error));
    }

    itemRow(row) {
        let line = row.description;
        if (row.brand) {
            line = row.brand + " " + line;
        }
        return (
            <TouchableHighlight onPress={()=>this.setState({query: line, acItems: []})}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', padding: 2}}>
                <Text>{line}</Text>
            </View>
            </TouchableHighlight>
        );
    }

    toggleMark(item) {
        const newList = this.state.list.map(i => {
            if (i.text != item) {
                return i;
            }

            i.marked = i.marked ? false : true;
            return i;
        });
        newDS = this.ds.cloneWithRows(newList);
        this.setState({
            list: newList,
            dataSource: newDS
        });
        this.saveList(newList);
    }

    removeItem(item) {
        const newList = this.state.list.filter(i => i.text != item);
        newDS = this.ds.cloneWithRows(newList);
        this.setState({
            list: newList,
            dataSource: newDS
        });
        this.saveList(newList);
    }

    listRow(row) {
        const {width, height} = Dimensions.get('window');
        const tw = width - 85;
        const dec = row.marked ? 'line-through' : 'none';
        const checkColor = row.marked ? '#0c0' : '#ccc';
        return (
            <View style={{flexDirection: "row", marginBottom: 3}}>
                <TouchableHighlight onPress={() => this.toggleMark(row.text)}>
                    <Icon style={{paddingRight: 15}} color={checkColor} name="check-circle" size={30} />
                </TouchableHighlight>
                <Text style={{width:tw, fontSize: 20, textDecorationLine: dec}}>{row.text}</Text>
                <TouchableHighlight onPress={() => this.removeItem(row.text)}>
                    <Icon style={{marginRight: 10}} color="#c00" name="minus-circle" size={30} />
                </TouchableHighlight>
            </View>
        );
    }

    addItem(item) {
        if (item == "") return false;
        const newList = this.state.list;
        newList.push({text: item, marked: false});
        newDS = this.ds.cloneWithRows(newList);
        this.setState({
            dataSource: newDS,
            list: newList,
            query: ""
        });
        this.saveList(newList);
    }
    
    render() {
        const {width, height} = Dimensions.get('window');
        return (
            <View style={{flex: 1, width: width, alignItems: 'flex-start'}}
                onLayout={() => this.setState({dataSource:this.ds.cloneWithRows(this.state.list)})}>
                <ListView
                    style={[styles.list, {minWidth:(width-10)}]}
                    dataSource={this.state.dataSource}
                    renderRow={row => this.listRow(row)}
                    enableEmptySections={true}
                /> 
                <Autocomplete
                    containerStyle={{flex: 1, position: 'absolute', left: 0, right: 50, top: 5}}
                    defaultValue={this.state.query}
                    data={this.state.acItems}
                    onChangeText={text => this.search(text)}
                    renderItem={(item) => this.itemRow(item)}
                    placeholder="Search for item"
                />
                <TouchableHighlight onPress={() => this.addItem(this.state.query)}
                    style={{flex:1, position: 'absolute', right:5, top: 5}}>
                    <View style={styles.btn}>
                        <Icon name="plus" style={{color: 'white'}} size={20} />
                        <Text style={{color:'white'}}>Add</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
