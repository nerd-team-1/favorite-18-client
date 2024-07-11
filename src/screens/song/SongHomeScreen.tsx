import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SongHomeScreenProps {}

function SongHomeScreen({}: SongHomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>검색창</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.WHITE,
  },
});

export default SongHomeScreen;
