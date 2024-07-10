import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

function Example1HomeScreen() {
  console.log('env.test', Config.TEST);

  return (
    <View>
      <Text>예제 스크린1</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Example1HomeScreen;
