import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import PriceMarker from './PriceMarker';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class LiteMapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            coordinate={this.state.a}
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable
          >
            <PriceMarker amount={99} />
          </MapView.Marker>
          <MapView.Marker
            coordinate={this.state.b}
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable
          />
        </MapView>
      </View>
    );
  }
}

LiteMapView.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: 375,
    height: 350,
  },
});

module.exports = LiteMapView;