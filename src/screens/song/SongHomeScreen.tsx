import {getSongs} from '@/api/song/song';
import SearchInput from '@/components/common/SearchInput';
import CustomButton from '@/components/CustomButton';
import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {ApiResponse, PageData} from '@/types/common';
import {Song} from '@/types/domain';
import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';

interface SongHomeScreenProps {}

function SongHomeScreen({}: SongHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const [keyword, setKeyword] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  const handleSongSearch = () => {
    Keyboard.dismiss();

    const fetchSongs = async () => {
      try {
        const response: ApiResponse<PageData<Song>> = await getSongs(keyword);
        if (response.result === 'SUCCESS') {
          setSongs(response.data.content);
        } else {
          setError(response.error);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();

    console.log(songs);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그아웃"
          onPress={() => logoutMutation.mutate(null)}
        />
      </View>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 노래를 입력하세요."
        onSubmit={() => Keyboard.dismiss()}
      />
      <View style={styles.buttonContainer}>
        <CustomButton label="검색" onPress={handleSongSearch} />
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {songs.map(song => (
        <View key={song.songId} style={styles.songContainer}>
          <Text style={styles.songText}>Title: {song.title}</Text>
          <Text style={styles.songText}>Artist: {song.artist}</Text>
          {song.machineCodes.map((code, index) => (
            <View key={index}>
              <Text style={styles.songText}>
                Machine Type: {code.machineType}
              </Text>
              <Text style={styles.songText}>Song Code: {code.songCode}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  songContainer: {
    marginVertical: 10,
  },
  songText: {
    color: colors.WHITE,
  },
});

export default SongHomeScreen;
