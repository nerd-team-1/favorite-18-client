import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {colors, mainColors} from '@/constants';

function CustomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let icon;
          if (options.tabBarIcon) {
            icon = options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? mainColors.LIGHT_GREEN : colors.GRAY_200,
              size: 24,
            });
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, index === 1 && styles.middleTab]}>
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: mainColors.GRAY_FOOTER,
    borderRadius: 30,
    width: Dimensions.get('screen').width / 1.4,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  tab: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleTab: {
    backgroundColor: mainColors.LIGHT_GREEN,
    borderRadius: 32,
    width: 40,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
});

export default CustomTabBar;
