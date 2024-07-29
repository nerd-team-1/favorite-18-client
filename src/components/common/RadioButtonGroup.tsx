import {mainColors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

interface RadioButtonGroupProps {
  options: {
    label: string;
    value: string;
  }[];
  selectedValue: string;
  onValueChange: (newValue: string) => void;
}

function RadioButtonGroup({
  options,
  selectedValue,
  onValueChange,
}: RadioButtonGroupProps) {
  return (
    <RadioButton.Group
      onValueChange={newValue => onValueChange(newValue)}
      value={selectedValue}>
      <View style={styles.radioContainer}>
        {options.map(option => (
          <View style={styles.radioItem} key={option.value}>
            <RadioButton value={option.value} color={mainColors.LIGHT_GREEN} />
            <Text>{option.label}</Text>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 50,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RadioButtonGroup;
