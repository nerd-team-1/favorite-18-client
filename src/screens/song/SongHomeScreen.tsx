import SongSearchField from '@/components/song/SongSearchField';
import {alerts, colors, songNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {useFavorite} from '@/hooks/queries/useFavorite';
import {useSongInfo} from '@/hooks/useSongInfo';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {SongStackParamList} from '@/navigations/stack/SongStackNavigator';
import {ApiResponse, PageData} from '@/types/common';
import {Song} from '@/types/domain';
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
  const {fetchSongs} = useSongInfo();
  const {isLogin} = useAuth();
  const {getFavoriteSongsIdsMutation} = useFavorite();
  const [songList, setSongList] = useState<Song[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  const handleSongSearch = async () => {
    if (keyword.trim() === '') {
      return Alert.alert(
        alerts.NO_KEYWORD.TITLE,
        alerts.NO_KEYWORD.DESCRIPTION,
      );
    }

    fetchSongs(keyword, 0, (songsResponse: ApiResponse<PageData<Song>>) => {
      try {
        if (songsResponse.result === 'SUCCESS') {
          const songList = songsResponse.data.content;
          setSongList(songsResponse.data.content);
          if (isLogin) {
            const songIds: number[] = songList.map(song => song.songId);
            getFavoriteSongsIdsMutation.mutate(songIds, {
              onSuccess: (favoriteResponse: ApiResponse<number[]>) => {
                if (favoriteResponse.result === 'SUCCESS') {
                  setFavoriteSongs(favoriteResponse.data);
                }
              },
            });
          }
        }
      } catch (err: any) {
        setSongList([]);
        setFavoriteSongs([]);
      } finally {
        navigation.navigate(songNavigations.SONG_SEARCH_LIST, {
          searchKeyword: keyword,
          searchSongs: songList,
          searchFavoriteSongs: favoriteSongs,
        });
      }
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
