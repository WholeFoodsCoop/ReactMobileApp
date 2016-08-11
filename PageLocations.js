
import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    Linking
} from 'react-native';

var styles = StyleSheet.create({
    mapBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#000',
        borderStyle: 'solid'
    }
});

import MapView from 'react-native-maps';
import MapLinks from './MapLinks.js';

import settings from './settings.json';

export default class PageLocations extends Component {
    render() {
        var {width, height} = Dimensions.get('window')
        var w = width - 10;
        var ml = new MapLinks();
        return (
            <MapView 
                style={[styles.mapBox, {width: w}]}
                initialRegion={{
                    latitude: settings.locations.mapLat,
                    longitude: settings.locations.mapLong,
                    latitudeDelta: settings.locations.mapLatDelta,
                    longitudeDelta: settings.locations.mapLongDelta
                }}
            >
                {settings.locations.markers.map(m => {
                    return (<MapView.Marker
                        coordinate={{latitude: m.lat, longitude: m.long}}
                        title={m.title}
                        description={m.subtitle}
                        key={m.lat+"x"+m.long}
                        style={{width:40, height:40}}
                        >
                            <MapView.Callout style={{flex:1, position: 'relative', width: 200}}>
                                <View>
                                    <Text style={{fontSize: 14}}>{m.title}</Text>
                                    <TouchableHighlight
                                        onPress={() => Linking.openURL(ml.get(m.subtitle)).catch(err=>console.log(err))}
                                    >
                                        <Text style={{fontSize: 12, color: 'blue', textDecorationLine: 'underline'}}>{m.subtitle}</Text>
                                    </TouchableHighlight>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    );
                })}
            </MapView>
        );
    }
}

