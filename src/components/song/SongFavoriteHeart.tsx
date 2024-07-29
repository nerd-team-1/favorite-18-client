import React from 'react';
import {colors} from '@/constants';
import {Song} from '@/types/domain';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SongFavoriteHeartProps {
  isFavorite: boolean;
  totalFavoriteCount: number | undefined;
  song: Song | undefined;
  heartSize: number;
  fontSize: number;
  onPressFavorite: (song: Song) => void;
}

function SongFavoriteHeart({
  isFavorite,
  totalFavoriteCount,
  song,
  heartSize,
  fontSize,
  onPressFavorite,
}: SongFavoriteHeartProps) {
  return song !== undefined ? (
    <View style={styles.favorBox}>
      <Pressable onPress={() => onPressFavorite(song)}>
        {Boolean(isFavorite) && (
          <Ionicons name={'heart'} color={colors.RED_500} size={heartSize} />
        )}
        {Boolean(!isFavorite) && (
          <Ionicons
            name={'heart-outline'}
            color={colors.RED_500}
            size={heartSize}
          />
        )}
      </Pressable>
      <Text style={[styles.favoriteCount, {fontSize: fontSize}]}>
        {totalFavoriteCount}
      </Text>
    </View>
  ) : (
    <View style={styles.favorBox}>
      <Pressable>
        {Boolean(isFavorite) && (
          <Ionicons name={'heart'} color={colors.RED_500} size={heartSize} />
        )}
        {Boolean(!isFavorite) && (
          <Ionicons
            name={'heart-outline'}
            color={colors.RED_500}
            size={heartSize}
          />
        )}
      </Pressable>
      <Text style={[styles.favoriteCount, {fontSize: fontSize}]}>0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  favorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  favoriteCount: {
    color: colors.WHITE,
    marginRight: 10,
  },
});

export default SongFavoriteHeart;
