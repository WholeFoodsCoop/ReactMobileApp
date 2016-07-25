
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class PageList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            list: [],
            options: {},
            dataSource: this.ds.cloneWithRows([]),
        }
    }

    search(term) {
        if (term.length < 3) {
            this.setState({
                dataSource: this.ds.cloneWithRows([])
            });
            return;
        }
        fetch('http://store.wholefoods.coop/api/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({upc: term})
        }).then((response) => {
            console.log(response);
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.length > 20) {
                responseJSON = responseJSON.slice(0, 20);
            }
            this.setState({
                dataSource: this.ds.cloneWithRows(responseJSON)
            });
        })
        .catch((error) => console.log(error));
    }

    itemRow(row) {
        var line = row.description;
        if (row.brand) {
            line = row.brand + " " + line;
        }
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', padding: 2}}>
                <Icon name="plus" size={10} />
                <Text>{line}</Text>
            </View>
        );
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <View> 
                    <TextInput style={{height: 50, width: 250, borderColor: '#000', borderWidth:1}} 
                        returnKeyType='search'
                        placeholder='PLU or description'
                        onChangeText={this.search.bind(this)} 
                    />
                </View>
                <ListView style={{borderColor: '#000', borderWidth: 1, borderStyle: 'solid', width: 250}}
                    dataSource={this.state.dataSource}
                    renderRow={this.itemRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}
