import React, {useEffect, useState} from 'react';
import {
  alerts,
  colors,
  headerKeys,
  mainColors,
  songNavigations,
} from '@/constants';
import {SongStackParamList} from '@/navigations/stack/SongStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Song} from '@/types/domain';
import {getHeader} from '@/utils/header';
import {ApiResponse} from '@/types/common';
import {
  addFavorite,
  getFavorite,
  getSong,
  removeFavorite,
} from '@/api/song/song';
import SongFavoriteHeart from '@/components/song/SongFavoriteHeart';

type SongInfoDetailScreenProps = StackScreenProps<
  SongStackParamList,
  typeof songNavigations.SONG_DETAIL
>;

function SongInfoDetailScreen({route, navigation}: SongInfoDetailScreenProps) {
  const {songId} = route.params;
  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const token = getHeader(headerKeys.AUTH_TOKEN);

  const fetchSong = async () => {
    if (songId === undefined) {
      return Alert.alert(
        alerts.SONG_SEARCH_ERROR.TITLE,
        alerts.SONG_SEARCH_ERROR.DESCRIPTION,
      );
    }
    try {
      const response: ApiResponse<Song> = await getSong(songId);
      if (response.result === 'SUCCESS') {
        setSong(response.data);
      } else {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkFavorite = async () => {
    if (songId === undefined) {
      return Alert.alert(
        alerts.SONG_SEARCH_ERROR.TITLE,
        alerts.SONG_SEARCH_ERROR.DESCRIPTION,
      );
    }
    try {
      const response: ApiResponse<number[]> = await getFavorite([songId]);
      if (response.result === 'SUCCESS') {
        setIsFavorite(response.data.includes(songId));
      }
    } catch (err: any) {
      setIsFavorite(false);
    }
  };

  const handleFavoritePress = (song: Song) => {
    if (token === null) {
      return Alert.alert(
        alerts.NEED_LOGIN.TITLE,
        alerts.NEED_LOGIN.DESCRIPTION,
      );
    }

    if (isFavorite) {
      removeFavoriteSong(songId);
      setSong({...song, totalFavoriteCount: song.totalFavoriteCount - 1});
    } else {
      addFavoriteSong(songId);

      setSong({...song, totalFavoriteCount: song.totalFavoriteCount + 1});
    }
  };

  const removeFavoriteSong = async (songId: number) => {
    try {
      const response: ApiResponse<void> = await removeFavorite(songId);
      if (response.result === 'SUCCESS') {
        setIsFavorite(false);
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
        setIsFavorite(true);
      }
    } catch (err: any) {
      return Alert.alert(
        alerts.FAVORITE_ADD_ERROR.TITLE,
        alerts.FAVORITE_ADD_ERROR.DESCRIPTION,
      );
    }
  };

  useEffect(() => {
    fetchSong();
    if (token !== null) {
      checkFavorite();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.marginBottomContainer}>
        <Text style={styles.title}>{song?.title}</Text>
      </View>
      <View style={styles.marginBottomContainer}>
        <Text style={styles.artist}>{song?.artist}</Text>
      </View>
      <View style={styles.codeFavoriteContainer}>
        <View style={styles.machineContainer}>
          {song?.machineCodes.map(machineCode => {
            // Filter로 분류를 해봤으나, Style에서 Lint 경고가 지속 발생하여, IF문으로 변경하여 처리함.
            if (
              machineCode.machineType === 'KY' ||
              machineCode.machineType === 'TJ'
            ) {
              return (
                <View style={styles.songCodeContainer}>
                  <View
                    style={[
                      styles.machineBox,
                      styles[`${machineCode.machineType}Box`],
                    ]}>
                    <Text style={styles.machineType}>
                      {machineCode.machineType === 'TJ' ? 'TJ' : '금영'}
                    </Text>
                  </View>
                  <Text style={styles.songCode}>{machineCode.songCode}</Text>
                </View>
              );
            }
          })}
        </View>
        <SongFavoriteHeart
          isFavorite={isFavorite}
          song={song}
          totalFavoriteCount={song?.totalFavoriteCount}
          onPressFavorite={handleFavoritePress}
          heartSize={40}
          fontSize={20}
        />
      </View>
      <ScrollView style={styles.lyrcisContainer}>
        {song?.lyrics !== null && (
          <Text style={styles.lyrcis}>{song?.lyrics}</Text>
        )}
        {(song?.lyrics === null || song?.lyrics.trim() === '') && (
          <Text style={styles.lyrcis}>가사 준비중</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  marginBottomContainer: {
    marginBottom: 10,
  },
  codeFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  machineContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  lyrcisContainer: {
    flex: 1,
    borderRadius: 5,
  },
  songCodeContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  machineBox: {
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  TJBox: {
    backgroundColor: mainColors.TJ,
  },
  KYBox: {
    backgroundColor: mainColors.KY,
  },
  machineType: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: '400',
  },
  songCode: {
    color: colors.WHITE,
    marginRight: 10,
  },
  favoriteBox: {
    flexDirection: 'row',
    gap: 3,
  },
  title: {
    color: mainColors.LIGHT_GREEN,
    fontSize: 26,
    fontWeight: '700',
  },
  artist: {
    color: colors.GRAY_200,
    fontSize: 16,
    fontWeight: '500',
  },
  lyrcis: {
    color: colors.WHITE,
  },
});

export default SongInfoDetailScreen;
