import SongSearchField from '@/components/song/SongSearchField';
import {alerts, colors, songNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useFavoriteInfo from '@/hooks/useFavoriteInfo';
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
  const {fetchConfirmLikeSongIds} = useFavoriteInfo();

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  const navigateToSongSearchList = (
    searchKeyword: string,
    searchSongs: Song[],
    searchFavoriteSongs: number[],
  ) => {
    navigation.navigate(songNavigations.SONG_SEARCH_LIST, {
      searchKeyword,
      searchSongs,
      searchFavoriteSongs,
    });
  };

  const handleSongSearch = () => {
    if (keyword.trim() === '') {
      return Alert.alert(
        alerts.NO_KEYWORD.TITLE,
        alerts.NO_KEYWORD.DESCRIPTION,
      );
    }

    let searchSongList: Song[] = [];
    let searchFavoriteSongs: number[] = [];

    fetchSongs(keyword, 0, (songsResponse: ApiResponse<PageData<Song>>) => {
      if (songsResponse.result === 'SUCCESS') {
        searchSongList = songsResponse.data.content;
        if (isLogin) {
          const songIds: number[] = searchSongList.map(song => song.songId);
          fetchConfirmLikeSongIds(
            songIds,
            (favoriteResponse: ApiResponse<number[]>) => {
              if (favoriteResponse.result === 'SUCCESS') {
                searchFavoriteSongs = favoriteResponse.data;
              } else {
                searchFavoriteSongs = [];
              }
              navigateToSongSearchList(
                keyword,
                searchSongList,
                searchFavoriteSongs,
              );
            },
          );
        } else {
          navigateToSongSearchList(
            keyword,
            searchSongList,
            searchFavoriteSongs,
          );
        }
      } else {
        return Alert.alert(
          alerts.SONG_SEARCH_ERROR.TITLE,
          alerts.SONG_SEARCH_ERROR.DESCRIPTION,
        );
      }
    });

    // if (isLogin) {
    //   const songIds: number[] = searchSongList.map(song => song.songId);
    //   await fetchConfirmLikeSongIds(
    //     songIds,
    //     (favoriteResponse: ApiResponse<number[]>) => {
    //       if (favoriteResponse.result === 'SUCCESS') {
    //         searchFavoriteSongs = favoriteResponse.data;
    //         console.log(
    //           `SongHomeScreen FetchSongs Confirm FavoriteSongs >>> ${searchFavoriteSongs}`,
    //         );
    //       } else {
    //         searchFavoriteSongs = [];
    //       }
    //     },
    //   );
    // }
    // searchSongList = getSongListByKeyword();
    // searchFavoriteSongs = getFavoriteSongsBySongIds(searchSongList);

    // navigation.navigate(songNavigations.SONG_SEARCH_LIST, {
    //   searchKeyword: keyword,
    //   searchSongs: searchSongList,
    //   searchFavoriteSongs: searchFavoriteSongs,
    // });
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
