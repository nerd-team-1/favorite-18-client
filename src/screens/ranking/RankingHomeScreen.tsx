import {colors, screen} from '@/constants';
import useGetRankingList from '@/hooks/queries/useGetRankList';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function RankingHomeScreen() {
  const {data: rank} = useGetRankingList();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>오늘의 조회수 랭킹 TOP 100</Text>
      <FlatList
        data={rank?.flat()}
        renderItem={({item, index}) => (
          <View style={styles.rankInfoContainer}>
            <View style={styles.leftContainer}>
              <View key={index} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={
                    item.songRankDto.albumUrl
                      ? {uri: item.songRankDto.albumUrl}
                      : require('@/assets/album-default.png')
                  }
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.rankIndexText}>{index + 1}</Text>
              <View style={styles.rankTitleContainer}>
                <Text style={styles.rankTitleText}>
                  {item.songRankDto.title}
                </Text>
                <Text style={styles.rankText}>{item.songRankDto.artist}</Text>
              </View>
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.searchCountText}>View</Text>
              <Text style={styles.searchCountText}>{item.searchCount}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
        numColumns={1}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    width: '100%',
  },
  infoText: {
    marginTop: 10,
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'center',
  },
  rankInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_700,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: screen.WIDTH / 6,
    height: screen.WIDTH / 6,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  rankIndexText: {
    marginLeft: 5,
    fontSize: 18,
    color: colors.WHITE,
  },
  rankTitleContainer: {
    marginLeft: 12,
  },
  rankTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  rankText: {
    color: colors.WHITE,
  },
  countContainer: {
    alignItems: 'center',
  },
  searchCountText: {
    marginRight: 15,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'right',
  },
});

export default RankingHomeScreen;
