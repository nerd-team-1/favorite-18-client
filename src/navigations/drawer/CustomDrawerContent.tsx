import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, mainNavigations, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation} = useAuth();

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.EDIT_PROFILE,
    });
  };

  const handlePressLogout = async () => {
    logoutMutation.mutate(null);
    await GoogleSignin.signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name={'person'} color={colors.GRAY_700} size={18} />
          <Text style={styles.bottomMenuText}>내 프로필</Text>
        </Pressable>
        <Pressable style={styles.bottomMenu} onPress={handlePressLogout}>
          <MaterialIcons name={'logout'} color={colors.GRAY_700} size={18} />
          <Text style={styles.bottomMenuText}>로그아웃</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bottomMenuText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.GRAY_700,
  },
});

export default CustomDrawerContent;
