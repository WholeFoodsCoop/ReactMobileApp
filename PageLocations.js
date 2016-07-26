
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

export default class PageLocations extends Component {
    render() {
        var {width, height} = Dimensions.get('window')
        var w = width - 10;
        return (
            <MapView 
                style={[styles.mapBox, {width: w}]}
                initialRegion={{
                    latitude: 46.776618,
                    longitude: -92.124954,
                    latitudeDelta: 0.13,
                    longitudeDelta: 0.09,
                }}
            >
                <MapView.Marker
                    coordinate={{latitude: 46.795624, longitude: -92.094133}}
                    title="Whole Foods Co-op Hillside"
                    description="610 E 4th St, Duluth, MN 55805"
                />
                <MapView.Marker
                    coordinate={{latitude: 46.746594, longitude: -92.156873}}
                    title="Whole Foods Co-op Hillside"
                    description="4426 Grand Ave, Duluth, MN 55807"
                />
            </MapView>
        );
    }
}

