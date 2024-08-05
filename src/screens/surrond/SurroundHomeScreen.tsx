import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Config from 'react-native-config';

function SurrondHomeScreen() {
  console.log('env.test', Config.TEST);

  return (
    <SafeAreaView style={styles.container}>
      <NaverMapView style={styles.mapViewContainer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapViewContainer: {
    flex: 1,
  },
});

export default SurrondHomeScreen;
