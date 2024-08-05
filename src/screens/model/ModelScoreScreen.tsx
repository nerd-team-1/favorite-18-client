import {colors, mainColors, modelNavigations} from '@/constants';
import {ModelStackParamList} from '@/navigations/stack/ModelStackNavigator';
import {ResponseModelScore} from '@/types/response';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ModelScoreScreenProps = StackScreenProps<
  ModelStackParamList,
  typeof modelNavigations.MODEL_SCORE
>;

function ModelScoreScreen({route}: ModelScoreScreenProps) {
  const {data, isPending} = route.params;
  const [modelScore, setModelScore] = useState<ResponseModelScore>(data);
  const [loading, setLoading] = useState(isPending);

  useEffect(() => {
    if (isPending) {
      // Perform any additional actions if needed while loading
    } else {
      setLoading(false);
      setModelScore(data);
    }
  }, [isPending, data]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingConatiner}>
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#00ff00"
          />
          <Text style={styles.loadingText}>분석이 진행 중입니다.</Text>
          <Text style={styles.loadingText}>
            AI 분석은 약 2~3분 정도 진행됩니다.
          </Text>
        </View>
      ) : modelScore ? (
        <>
          <Text style={styles.infoText}>AI 가 분석한 당신의 점수는,</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{modelScore.score}</Text>
            {/* <Text style={styles.scoreInfoText}>점</Text> */}
          </View>
          <View style={styles.scoreValueContainer}>
            <Text style={styles.scoreValueIcon}>😍</Text>
            <Text style={styles.scoreValueText}>엄청난 실력이시네요!</Text>
          </View>
          <ScrollView style={styles.historyContainer}>
            <Text style={styles.historyHeader}>내 점수 리스트</Text>
          </ScrollView>
        </>
      ) : (
        <Text style={styles.text}>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  text: {
    color: colors.WHITE,
  },
  loadingConatiner: {
    marginTop: 100,
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    color: colors.WHITE,
  },
  infoText: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: mainColors.LIGHT_GREEN,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  scoreInfoText: {
    fontSize: 18,
    color: colors.WHITE,
    marginLeft: 10,
    marginTop: 20,
  },
  scoreValueContainer: {
    alignItems: 'center',
    marginTop: 15,
    gap: 5,
    color: colors.WHITE,
  },
  scoreValueIcon: {
    fontSize: 30,
    color: colors.WHITE,
  },
  scoreValueText: {
    fontSize: 18,
    color: colors.GRAY_500,
  },
  historyContainer: {
    marginTop: 40,
  },
  historyHeader: {
    color: mainColors.LIGHT_GREEN,
  },
});

export default ModelScoreScreen;
