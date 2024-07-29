import React, {useCallback} from 'react';
import {
  addFavorite,
  getFavorite,
  getSongs,
  removeFavorite,
} from '@/api/song/song';
import SongListInfo from '@/components/song/SongListInfo';
import SongSearchField from '@/components/song/SongSearchField';
import {alerts, headerKeys, songNavigations} from '@/constants';
import {SongStackParamList} from '@/navigations/stack/SongStackNavigator';
import {ApiResponse, PageData} from '@/types/common';
import {Song} from '@/types/domain';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getHeader} from '@/utils/header';

type SongSearchListScreenProps = StackScreenProps<
  SongStackParamList,
  typeof songNavigations.SONG_SEARCH_LIST
>;

function SongSearchListScreen({route, navigation}: SongSearchListScreenProps) {
  const {searchKeyword} = route.params;
  const [keyword, setKeyword] = useState<string>(String(searchKeyword));
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);
  const token = getHeader(headerKeys.AUTH_TOKEN);

  const fetchSongs = useCallback(async () => {
    if (keyword.trim() === '') {
      return Alert.alert(
        alerts.NO_KEYWORD.TITLE,
        alerts.NO_KEYWORD.DESCRIPTION,
      );
    }
    setLoading(true);
    try {
      const response: ApiResponse<PageData<Song>> = await getSongs(
        keyword,
        page,
      );
      if (response.result === 'SUCCESS') {
        const songList: Song[] = response.data.content;
        setSongs(songList);

        if (token !== null) {
          const songIds: number[] = songList.map(song => song.songId);

          const favoriteSongResponse: ApiResponse<number[]> = await getFavorite(
            songIds,
          );
          if (favoriteSongResponse.result === 'SUCCESS') {
            setFavoriteSongs(favoriteSongResponse.data);
          }
        }
      } else {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  const handleChangeKeyword = useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const handleSongDetailPress = useCallback(
    (song: Song) => {
      const {songId} = song;
      navigation.navigate(songNavigations.SONG_DETAIL, {songId: songId});
    },
    [navigation],
  );

  const handleFavoritePress = (song: Song) => {
    if (token === null) {
      return Alert.alert(
        alerts.NEED_LOGIN.TITLE,
        alerts.NEED_LOGIN.DESCRIPTION,
      );
    }

    const {songId} = song;
    if (favoriteSongs.includes(songId)) {
      removeFavoriteSong(songId);

      setSongs(
        songs.map(s => {
          if (s.songId === songId) {
            return {...s, totalFavoriteCount: s.totalFavoriteCount - 1};
          }
          return s;
        }),
      );
    } else {
      addFavoriteSong(songId);

      setSongs(
        songs.map(s => {
          if (s.songId === songId) {
            return {...s, totalFavoriteCount: s.totalFavoriteCount + 1};
          }
          return s;
        }),
      );
    }
  };

  const removeFavoriteSong = async (songId: number) => {
    try {
      const response: ApiResponse<void> = await removeFavorite(songId);
      if (response.result === 'SUCCESS') {
        setFavoriteSongs(favoriteSongs.filter(id => id !== songId));
      }
    } catch (err: any) {
      return Alert.alert(
        alerts.FAVORITE_REMOVE_ERROR.TITLE,
        alerts.FAVORITE_REMOVE_ERROR.DESCRIPTION,
      );
    }
  };

  const addFavoriteSong = async (songId: number) => {
    try {
      const response: ApiResponse<void> = await addFavorite(songId);
      if (response.result === 'SUCCESS') {
        setFavoriteSongs([...favoriteSongs, songId]);
      }
    } catch (err: any) {
      return Alert.alert(
        alerts.FAVORITE_ADD_ERROR.TITLE,
        alerts.FAVORITE_ADD_ERROR.DESCRIPTION,
      );
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SongSearchField
        isAutoFocus={false}
        isNeedRadius={false}
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={() => {
          fetchSongs();
        }}
      />
      <ScrollView>
        {loading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        {error && (
          <View>
            <Text>{error}</Text>
          </View>
        )}
        {songs.length > 0 &&
          songs.map((song, index) => {
            const isFavoriteSong = favoriteSongs.includes(song.songId);
            return (
              <SongListInfo
                key={song.songId}
                song={song}
                isFavorite={isFavoriteSong}
                onPressSong={handleSongDetailPress}
                onPressFavorite={handleFavoritePress}
              />
            );
          })}
      </ScrollView>
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
