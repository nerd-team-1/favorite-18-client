import {colors, mainColors, modelNavigations, screen} from '@/constants';
import {SongDto} from '@/types/dto';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';

// type Navigation = CompositeNavigationProp<
//   StackNavigationProp<
//     ModelStackParamList,
//     typeof modelNavigations.MODEL_SELECT
//   >,
//   DrawerNavigationProp<MainDrawerParamList>
// >;

function ModelSelectScreen() {
  const navigation = useNavigation<Navigation>();
  const analysisList: SongDto[] = [
    {
      id: 72761,
      title: '겁쟁이',
      artist: '버즈',
      albumPictureUrl:
        'https://image.bugsm.co.kr/album/images/500/80070/8007002.jpg',
    },
  ];

  const handleGoToRecord = (songId: number) => {
    navigation.navigate(modelNavigations.MODEL_HOME, songId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>점수 분석 노래 선택</Text>
      <Text style={styles.infoText}>
        분석 가능한 노래는 추후 더 추가될 예정입니다.
      </Text>
      <View style={styles.analysisContainer}>
        <FlatList
          data={analysisList?.flat()}
          renderItem={({item}) => (
            <View style={styles.analysisInfoContainer}>
              <View style={styles.analysisTitleContainer}>
                <View key={item.id} style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{uri: item.albumPictureUrl}}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.analysisInfoText}>{item.artist}</Text>
                <Text style={styles.analysisInfoText}>-</Text>
                <Text style={styles.analysisInfoText}>{item.title}</Text>
              </View>
              <View style={styles.analysisButtonContainer}>
                <Button
                  title="점수 분석"
                  onPress={() => handleGoToRecord(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={item => String(item.id)}
          numColumns={1}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 10,
    color: mainColors.LIGHT_GREEN,
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoText: {
    marginTop: 10,
    color: colors.GRAY_700,
  },
  contentContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  analysisContainer: {
    width: '100%',
  },
  analysisInfoContainer: {
    width: '100%',
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_700,
  },
  analysisTitleContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  analysisInfoText: {
    color: colors.WHITE,
  },
  imageContainer: {
    width: screen.WIDTH / 6,
    height: screen.WIDTH / 6,
    marginLeft: 5,
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  analysisButtonContainer: {
    marginRight: 10,
  },
});

export default ModelSelectScreen;
