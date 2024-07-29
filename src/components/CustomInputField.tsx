import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors, screen} from '../constants';
import {mergeRefs} from '../utils';

interface CustomInputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = screen.HEIGHT;

const CustomInputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: CustomInputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingHorizontal: deviceHeight > 700 ? 17 : 14,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  input: {
    fontSize: 16,
    color: colors.WHITE,
    padding: 0,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingBottom: 10,
  },
});

export default CustomInputField;
