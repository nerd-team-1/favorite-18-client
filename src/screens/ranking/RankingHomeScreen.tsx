import { alerts, colors } from '@/constants';
import { useRanking } from '@/hooks/useRankList';
import { ApiResponse, PageData } from '@/types/common';
import { Ranking } from '@/types/domain';
import { getDateWithSeperator } from '@/utils/date';
//import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function RankingHomeScreen() {
  const { fetchRanking } = useRanking();
  const [ranking, setRanking] = useState<Ranking[]>();
  const [selectedMachineType, setSelectedMachineType] = useState<string>('TJ');
  console.log('랭킹', Config.TEST);

  useEffect(() => {

    fetchRanking(selectedMachineType, (rankingsResponse: ApiResponse<PageData<Ranking>>) => {
      if (rankingsResponse.result === 'SUCCESS') {
        setRanking(rankingsResponse.data.content);
      } else {
        setRanking([]);
        Alert.alert(
          alerts.RANK_SEARCH_ERROR.TITLE,
          alerts.RANK_SEARCH_ERROR.DESCRIPTION,
        );
      }
    });
  }, [fetchRanking]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        {/* <Picker
          selectedValue={selectedMachineType}
          onValueChange={(itemValue) => setSelectedMachineType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="TJ" value="TJ" />
          <Picker.Item label="금영" value="KY" />
        </Picker> */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('@/assets/icon-inverted-triangle.png')}
            resizeMode="contain"
          />
        </View>
      </View>
      <DataTable>
        {ranking?.map((rankItem) =>
          rankItem.song.map((songItem, songIndex) => (
            <DataTable.Row key={`${rankItem.rankId}-${songIndex}`}>
              <DataTable.Cell>
                <Image
                  source={{ uri: songItem.albumUrl }}
                  style={styles.image}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.text}>{songItem.title}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.text}>{songItem.artist}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                {songItem.machineCodes
                  .filter((machineItem) => machineItem.machineType === selectedMachineType)
                  .map((filteredMachineItem, machineIndex) => (
                    <Text key={`${filteredMachineItem.machineType}-${machineIndex}`} style={styles.text}>
                      {filteredMachineItem.songCode}
                    </Text>
                  ))
                }
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
      </DataTable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableRow: {
    backgroundColor: colors.GRAY_700,
    color: colors.WHITE,

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // 이미지 둥글게
    marginRight: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 10,
  },
  picker: {
    height: 50,
    width: '10%',
    color: colors.WHITE, // 선택박스의 텍스트 색상 설정
    backgroundColor: colors.WHITE,
  },

  text: {
    color: colors.WHITE,
  },
  logoImage: {
    transform: [{ translateX: -35 }, { translateY: -7 }],
    width: '140%',
    height: '140%',
  },

  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width / 2,
    backgroundColor: colors.WHITE,
  },

});

export default RankingHomeScreen;
