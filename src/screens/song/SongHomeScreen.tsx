import SongSearchField from '@/components/song/SongSearchField';
import {alerts, colors, songNavigations} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {SongStackParamList} from '@/navigations/stack/SongStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<SongStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

interface SongHomeScreenProps {}

function SongHomeScreen({}: SongHomeScreenProps) {
  const navigation = useNavigation<Navigation>();
  const [keyword, setKeyword] = useState<string>('');

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  const handleSongSearch = () => {
    if (keyword.trim() === '') {
      return Alert.alert(
        alerts.NO_KEYWORD.TITLE,
        alerts.NO_KEYWORD.DESCRIPTION,
      );
    }
    navigation.navigate(songNavigations.SONG_SEARCH_LIST, {
      searchKeyword: keyword,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SongSearchField
        isAutoFocus={false}
        isNeedRadius={true}
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={handleSongSearch}
      />
      {/* 랭킹데이터 추가 필요 */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  songContainer: {
    marginVertical: 10,
  },
  songText: {
    color: colors.WHITE,
  },
});

export default SongHomeScreen;
