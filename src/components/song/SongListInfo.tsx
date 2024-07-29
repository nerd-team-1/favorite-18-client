import React from 'react';
import {colors, mainColors} from '@/constants';
import {Song} from '@/types/domain';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SongFavoriteHeart from './SongFavoriteHeart';

interface SongListInfoProps {
  song: Song;
  isFavorite?: boolean;
  onPressSong: (song: Song) => void;
  onPressFavorite: (song: Song) => void;
}

function SongListInfo({
  song,
  isFavorite = false,
  onPressSong,
  onPressFavorite,
  ...props
}: SongListInfoProps) {
  const {title, artist, albumUrl, machineCodes, totalFavoriteCount} = song;
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPressSong(song)}
      {...props}>
      <View style={styles.albumContainer}>
        <Image
          resizeMode="cover"
          style={styles.albumImage}
          source={
            albumUrl === null || albumUrl === ''
              ? require('../../assets/album-default.png')
              : {uri: albumUrl}
          }
        />
      </View>
      <View style={styles.songInfoContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        <View style={styles.otherInfoContainer}>
          <View style={styles.songCodeBox}>
            {machineCodes.map(machineCode => {
              return machineCode.machineType === 'TJ' ? (
                <View style={styles.songCodeBox}>
                  <View style={[styles.machineBox, styles.tjBox]}>
                    <Text style={styles.machineType}>TJ</Text>
                  </View>
                  <Text style={styles.songCode}>{machineCode.songCode}</Text>
                </View>
              ) : (
                <View style={styles.songCodeBox}>
                  <View style={[styles.machineBox, styles.kyBox]}>
                    <Text style={styles.machineType}>금영</Text>
                  </View>
                  <Text style={styles.songCode}>{machineCode.songCode}</Text>
                </View>
              );
            })}
          </View>
          <SongFavoriteHeart
            isFavorite={isFavorite}
            totalFavoriteCount={totalFavoriteCount}
            song={song}
            onPressFavorite={onPressFavorite}
            heartSize={20}
            fontSize={10}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: mainColors.LIGHT_GREEN,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 5,
    gap: 5,
  },
  albumContainer: {
    width: 80,
    height: 80,
  },
  songInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5,
    gap: 8,
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: mainColors.LIGHT_GREEN,
    fontSize: 16,
    fontWeight: '700',
  },
  artist: {
    color: mainColors.GRAY,
    fontSize: 12,
    fontWeight: '400',
  },
  otherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  songCodeBox: {
    flexDirection: 'row',
    gap: 5,
  },
  machineBox: {
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  tjBox: {
    backgroundColor: mainColors.TJ,
  },
  kyBox: {
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
});

export default SongListInfo;
