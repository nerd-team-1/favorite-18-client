import getLocalSurround from '@/api/surrond/surround';
import {colors} from '@/constants';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function SurrondHomeScreen() {
  const {userLocation, isUserLocationError} = useUserLocation();
  const [location, setLocation] = useState<LatLng>(userLocation);
  const [singerMarkers, setSingerMarkers] = useState<Document[]>([]);
  const mapRef = useRef<NaverMapViewRef>(null);
  const map = () => mapRef.current;
  usePermission('LOCATION');

  const handleResearch = async () => {
    const {documents} = await getLocalSurround(location);
    setSingerMarkers(documents);
  };

  useEffect(() => {
    (async () => {
      const {documents} = await getLocalSurround(location);
      setSingerMarkers(documents);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NaverMapView
        ref={mapRef}
        style={styles.mapViewContainer}
        mapType="Basic"
        initialCamera={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 14,
        }}
        onCameraChanged={({latitude, longitude}) => {
          console.log(`onChanged ${latitude}, ${longitude}`);
          setLocation({latitude, longitude});
        }}>
        {singerMarkers.map(marker => (
          <NaverMapMarkerOverlay
            key={marker.id}
            latitude={parseFloat(marker.y)}
            longitude={parseFloat(marker.x)}
            onTap={() => console.log(1)}
            anchor={{x: 0.5, y: 1}}
            caption={{
              text: marker.place_name,
            }}
            width={50}
            height={50}
          />
        ))}
      </NaverMapView>
      <View style={styles.buttonList}>
        <Pressable style={styles.searchButton} onPress={handleResearch}>
          <MaterialIcons name="search" color={colors.BLACK} size={25} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapViewContainer: {
    flex: 1,
  },
  buttonList: {
    position: 'absolute',
    bottom: 100,
    right: 15,
  },
  searchButton: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default SurrondHomeScreen;
