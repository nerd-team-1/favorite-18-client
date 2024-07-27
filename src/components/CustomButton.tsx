import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import {colors, mainColors, screen} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium' | 'small';
  inValid?: boolean;
}

const deviceHeight = screen.HEIGHT;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        styles[variant],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={(styles.text, styles[`${variant}Text`])}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.GRAY_700,
  },
  filledPressed: {
    backgroundColor: colors.GRAY_500,
  },
  filledText: {
    color: colors.WHITE,
  },
  outlined: {
    borderColor: mainColors.LIGHT_GREEN,
    borderWidth: 1,
  },
  outlinedPressed: {
    borderColor: mainColors.LIGHT_GREEN,
    borderWidth: 1,
    opacity: 0.5,
  },
  outlinedText: {
    color: mainColors.LIGHT_GREEN,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  small: {
    width: '30%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CustomButton;
