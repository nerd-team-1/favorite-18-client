import {colors, mainColors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ModelHomeScreen() {
  return (
    <View style={{flex: 1, backgroundColor: mainColors.BLACK}}>
      <Text style={styles.text}>분석 스크린</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.WHITE,
  },
});

export default ModelHomeScreen;
