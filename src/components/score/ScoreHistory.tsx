import {colors, screen} from '@/constants';
import useGetModelScoreList from '@/hooks/queries/useGetModelScoreList';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

interface ScoreHistoryProps {}

function ScoreHistory({}: ScoreHistoryProps) {
  const {data: history} = useGetModelScoreList();

  return (
    <View>
      <FlatList
        data={history?.data.flat()}
        renderItem={({item}) => (
          <View style={styles.historyInfoContainer}>
            <View style={styles.historyTitleContainer}>
              <View key={item.id} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: item.song.albumPictureUrl}}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.historyInfoText}>{item.song.artist}</Text>
              <Text style={styles.historyInfoText}>-</Text>
              <Text style={styles.historyInfoText}>{item.song.title}</Text>
            </View>
            <Text style={styles.historyScoreText}>{item.score} 점</Text>
          </View>
        )}
        keyExtractor={item => String(item.id)}
        numColumns={1}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  historyInfoContainer: {
    width: '100%',
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_700,
  },
  imageContainer: {
    width: screen.WIDTH / 6,
    height: screen.WIDTH / 6,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  historyInfoText: {
    color: colors.WHITE,
  },
  historyScoreText: {
    color: colors.WHITE,
  },
});

export default ScoreHistory;
