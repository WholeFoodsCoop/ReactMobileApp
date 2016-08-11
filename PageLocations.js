
import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet
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

import settings from './settings.json';

export default class PageLocations extends Component {
    render() {
        var {width, height} = Dimensions.get('window')
        var w = width - 10;
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
                        >
                        </MapView.Marker>
                    );
                })}
            </MapView>
        );
    }
}

