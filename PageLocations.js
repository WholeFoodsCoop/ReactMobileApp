
import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    Linking
} from 'react-native';

const styles = StyleSheet.create({
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

    constructor(props) {
        super(props);
        this.state = { width: this.getWidth() }
    }

    getWidth() {
        const {width, height} = Dimensions.get('window')
        return width - 10;
    }

    render() {
        const ml = new MapLinks();
        return (
            <MapView 
                onLayout={()=>this.setState({width:this.getWidth()})}
                style={[styles.mapBox, {width: this.state.width}]}
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
                                    <Text allowFontScaling={false} style={{fontSize: 14}}>{m.title}</Text>
                                    <TouchableHighlight
                                        onPress={() => Linking.openURL(ml.get(m.subtitle)).catch(err=>console.log(err))}
                                    >
                                        <Text allowFontScaling={false} style={{fontSize: 12, color: 'blue', textDecorationLine: 'underline'}}>{m.subtitle}</Text>
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

