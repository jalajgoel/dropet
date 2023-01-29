import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import distanceImg from '../../assets/distance.png';

const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyArRzxLNop05ro2lVfIs-uTFpaxwvIiky4';

const Map = ({ route, navigation }) => {
    //get coords and location names from route
    const { params } = route;
    const { coordinates, locationsNames } = params;

    const [distanceInfo, setDistanceInfo] = useState({ distance: '', duration: '', errorMessage: '' });

    const origin = coordinates[0];
    const destination = coordinates[1];

    var mapView = null;

    return (
        <View style={styles.container}>
            {distanceInfo.distance && (
                <View style={styles.distanceStyles}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
                            {locationsNames.source} - {locationsNames.destination}
                        </Text>
                        <Text style={styles.distanceTextStyles}>Distance: {distanceInfo.distance} km</Text>
                        <Text style={styles.distanceTextStyles}>Duration: {(Number = (distanceInfo.duration / 60).toFixed(2))} hrs</Text>
                    </View>
                    <Image source={distanceImg} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                </View>
            )}
            <MapView style={styles.map} ref={(c) => (mapView = c)} provider={PROVIDER_GOOGLE}>
                {coordinates.map((coordinate, index) => (
                    <Marker key={`coordinate_${index}`} coordinate={coordinate} />
                ))}
                {coordinates.length >= 2 && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        waypoints={coordinates.length > 2 ? coordinates.slice(1, -1) : undefined}
                        onStart={(params) => {
                            // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={(result) => {
                            setDistanceInfo({
                                distance: result.distance,
                                duration: result.duration.toFixed(0)
                            });
                            mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: width / 20,
                                    bottom: height / 20,
                                    left: width / 20,
                                    top: height / 20
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            //console.log("error")
                        }}
                    />
                )}
            </MapView>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    distanceStyles: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#fff',
        width: '94%',
        marginHorizontal: 12,
        marginTop: 12,
        padding: 8,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    distanceTextStyles: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 4
    }
});
