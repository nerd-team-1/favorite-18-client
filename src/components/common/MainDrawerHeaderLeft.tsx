import React from 'react';
import {Dimensions} from 'react-native';
import {Image, StyleSheet, View} from 'react-native';

function MainDrawerHeaderLeft() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('@/assets/logo.png')}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width / 2,
    // backgroundColor: colors.WHITE,
  },
  image: {
    transform: [{translateX: -35}, {translateY: -7}],
    width: '140%',
    height: '140%',
  },
});

export default MainDrawerHeaderLeft;
