import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

function RankingHomeScreen() {
  console.log('env.test', Config.TEST);

  return (
    <View>
      <Text style={styles.text}>랭킹 스크린</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.WHITE,
  },
});

export default RankingHomeScreen;
