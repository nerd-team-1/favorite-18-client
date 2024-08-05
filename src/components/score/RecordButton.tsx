import {colors, mainColors, screen} from '@/constants';
import React from 'react';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface RecordButtonProps extends PressableProps {
  recording: boolean;
  inValid?: boolean;
}

const deviceHeight = screen.HEIGHT;

function RecordButton({
  recording,
  inValid = false,
  ...props
}: RecordButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles.filledPressed : styles.filled,
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles.outLine}>
        {recording ? (
          <Ionicons name={'stop'} color={colors.WHITE} size={36} />
        ) : (
          <Ionicons name={'recording-sharp'} color={colors.WHITE} size={45} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: mainColors.LIGHT_GREEN,
  },
  filledPressed: {
    backgroundColor: mainColors.LIGHT_GREEN,
    opacity: 0.5,
  },
  outLine: {
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecordButton;
