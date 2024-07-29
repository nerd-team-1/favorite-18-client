import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SongSearchFieldProps extends TextInputProps {
  isAutoFocus?: boolean;
  isNeedRadius?: boolean;
  value: string;
  onSubmit: () => void;
}

function SongSearchField({
  isAutoFocus = true,
  isNeedRadius = false,
  onSubmit,
  ...props
}: SongSearchFieldProps) {
  return (
    <View style={styles.textContainer}>
      <TextInput
        autoFocus={isAutoFocus}
        placeholder="검색할 노래를 입력하세요."
        placeholderTextColor={colors.GRAY_500}
        style={[styles.input, Boolean(isNeedRadius) && styles.inputRadius]}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <Ionicons
        name={'search'}
        color={colors.GRAY_700}
        size={20}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 1,
    color: colors.WHITE,
  },
  inputRadius: {
    borderRadius: 15,
  },
});

export default SongSearchField;
