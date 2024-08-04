import React, {useCallback, useEffect} from 'react';
import SongListInfo from '@/components/song/SongListInfo';
import SongSearchField from '@/components/song/SongSearchField';
import {alerts, songNavigations} from '@/constants';
import {SongStackParamList} from '@/navigations/stack/SongStackNavigator';
import {ApiResponse, PageData} from '@/types/common';
import {Song} from '@/types/domain';
import {StackScreenProps} from '@react-navigation/stack';
import {useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import {useFavorite} from '@/hooks/queries/useFavorite';
import {useSongInfo} from '@/hooks/useSongInfo';
import {addSongRankCount} from '@/api/rank/rank';
import useFavoriteInfo from '@/hooks/useFavoriteInfo';

type SongSearchListScreenProps = StackScreenProps<
  SongStackParamList,
  typeof songNavigations.SONG_SEARCH_LIST
>;

function SongSearchListScreen({route, navigation}: SongSearchListScreenProps) {
  const {searchKeyword, searchSongs, searchFavoriteSongs} = route.params;
  const [keyword, setKeyword] = useState<string>(String(searchKeyword));
  const [songs, setSongs] = useState<Song[]>(searchSongs);
  const [favoriteSongs, setFavoriteSongs] =
    useState<number[]>(searchFavoriteSongs);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>('');
  const {addFavoriteSongMutation, removeFavoriteSongMutation} = useFavorite();
  const {isLogin} = useAuth();
  const {fetchSongs} = useSongInfo();
  const {fetchConfirmLikeSongIds} = useFavoriteInfo();

  const handleKeyword = () => {
    if (keyword.trim() === '') {
      return Alert.alert(
        alerts.NO_KEYWORD.TITLE,
        alerts.NO_KEYWORD.DESCRIPTION,
      );
    }
    setLoading(true);
    setPage(0); //검색어 변경시 페이지 초기화

    fetchSongs(keyword, 0, (songsResponse: ApiResponse<PageData<Song>>) => {
      try {
        if (songsResponse.result === 'SUCCESS') {
          const songList: Song[] = songsResponse.data.content;
          setSongs(songList);
          if (isLogin) {
            const songIds: number[] = songList.map(song => song.songId);
            fetchConfirmLikeSongIds(
              songIds,
              (favoriteResponse: ApiResponse<number[]>) => {
                if (favoriteResponse.result === 'SUCCESS') {
                  setFavoriteSongs(favoriteResponse.data);
                }
              },
            );
          }
        } else {
          setSongs([]);
          setFavoriteSongs([]);
          setError(songsResponse.error);
        }
      } catch (err: any) {
        setSongs([]);
        setFavoriteSongs([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
  };
  const handleChangeKeyword = useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const handleSongDetailPress = useCallback(
    (song: Song) => {
      const {songId} = song;
      addSongRankCount(songId);
      navigation.navigate(songNavigations.SONG_DETAIL, {songId: songId});
    },
    [navigation],
  );

  const handleFavoritePress = (song: Song) => {
    if (!isLogin) {
      return Alert.alert(
        alerts.NEED_LOGIN.TITLE,
        alerts.NEED_LOGIN.DESCRIPTION,
      );
    }

    const {songId} = song;
    if (favoriteSongs.includes(songId)) {
      removeFavoriteSong(songId);
    } else {
      addFavoriteSong(songId);
    }
  };

  const removeFavoriteSong = (songId: number) => {
    removeFavoriteSongMutation.mutate(songId, {
      onSuccess: () => {
        setFavoriteSongs(favoriteSongs.filter(id => id !== songId));
        setSongs(
          songs.map(s => {
            if (s.songId === songId) {
              return {...s, totalFavoriteCount: s.totalFavoriteCount - 1};
            }
            return s;
          }),
        );
      },
    });
  };

  const addFavoriteSong = (songId: number) => {
    addFavoriteSongMutation.mutate(songId, {
      onSuccess: () => {
        setFavoriteSongs([...favoriteSongs, songId]);
        setSongs(
          songs.map(s => {
            if (s.songId === songId) {
              return {...s, totalFavoriteCount: s.totalFavoriteCount + 1};
            }
            return s;
          }),
        );
      },
    });
  };

  const handleEndReached = () => {
    try {
      let newPage = page + 1;
      setPage(newPage);
      setLoading(true);
      fetchSongs(
        keyword,
        newPage,
        (songsResponse: ApiResponse<PageData<Song>>) => {
          if (songsResponse.result === 'SUCCESS') {
            const songList: Song[] = songsResponse.data.content;
            setSongs([...songs, ...songList]);

            if (isLogin) {
              const songIds: number[] = songList.map(song => song.songId);
              fetchConfirmLikeSongIds(
                songIds,
                (favoriteResponse: ApiResponse<number[]>) => {
                  if (favoriteResponse.result === 'SUCCESS') {
                    setFavoriteSongs([
                      ...favoriteSongs,
                      ...favoriteResponse.data,
                    ]);
                  }
                },
              );
            }
          }
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (song: Song) => {
    const isFavoriteSong = favoriteSongs.includes(song.songId);
    return (
      <SongListInfo
        song={song}
        isFavorite={isFavoriteSong}
        onPressSong={handleSongDetailPress}
        onPressFavorite={handleFavoritePress}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SongSearchField
        isAutoFocus={false}
        isNeedRadius={false}
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={handleKeyword}
      />
      <FlatList
        data={songs}
        renderItem={item => renderItem(item.item)}
        keyExtractor={item => item.songId.toString()}
        onEndReachedThreshold={1} // 100% 스크롤이 내려가면 onEndReached 함수 호출
        onEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

export default SongSearchListScreen;
