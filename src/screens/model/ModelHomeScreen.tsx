import RecordButton from '@/components/score/RecordButton';
import {colors, mainColors, modelNavigations} from '@/constants';
import useGetModelScore from '@/hooks/queries/useGetModelScore';
import useMutateUploadRecord from '@/hooks/queries/useMutateUploadRecord';
import {useAudioRecorder} from '@/hooks/useAudioRecorder';
import usePermission from '@/hooks/usePermission';
import {RequestModelScore} from '@/types/request';
import {generateFilename} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

// type Navigation = CompositeNavigationProp<
//   StackNavigationProp<ModelStackParamList, typeof modelNavigations.MODEL_HOME>,
//   DrawerNavigationProp<MainDrawerParamList>
// >;

function ModelHomeScreen() {
  const navigation = useNavigation<Navigation>();
  usePermission('AUDIO');
  usePermission('READ_AUDIO');
  const uploadRecord = useMutateUploadRecord();
  const getModelScore = useGetModelScore();
  const [analysisSongId, setAnalysisSongId] = useState(72761);
  const fileName = generateFilename();
  const {recording, recordedFilePath, startRecording, stopRecording} =
    useAudioRecorder(fileName);

  const noRecordFile = !recordedFilePath;

  const handleModelAnalysis = async (songId: number, filePath: string) => {
    const formData = new FormData();
    const fileUri = `file://${filePath}`;
    formData.append('file', {
      uri: fileUri,
      type: 'audio/m4a',
      name: `${filePath.split('/').pop()}`,
    } as any);

    formData.append('data', String(songId));

    uploadRecord.mutate(formData, {
      onSuccess: async response => {
        const request: RequestModelScore = {
          modelScoreId: response.data.modelScoreId,
          originalFilename: String(songId),
          recordedFilename: response.data.recordedFilename,
        };

        navigation.navigate(modelNavigations.MODEL_SCORE, {
          data: null,
          isPending: true,
        });

        const modelScoreResponse = await getModelScore.mutateAsync(request);

        navigation.navigate(modelNavigations.MODEL_SCORE, {
          data: modelScoreResponse.data,
          isPending: false,
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {!noRecordFile
          ? recording
            ? '녹음이 진행 중입니다.'
            : '분석 버튼을 눌러 점수를 확인하세요.'
          : '버튼을 눌러 녹음을 진행하세요.'}
      </Text>
      <View style={styles.waveContainer} />
      <Text style={styles.timeText}>01:30.42</Text>
      <Button
        title="점수 분석"
        onPress={() => handleModelAnalysis(analysisSongId, recordedFilePath)}
        disabled={noRecordFile || recording}
      />
      <View style={styles.buttonContainer}>
        <RecordButton
          recording={recording}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  waveContainer: {
    width: '98%',
    height: 180,
    backgroundColor: colors.GRAY_500,
    borderRadius: 15,
  },
  infoText: {
    paddingVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: mainColors.LIGHT_GREEN,
  },
  timeText: {
    paddingVertical: 5,
    fontSize: 24,
    color: colors.WHITE,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    color: colors.WHITE,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ModelHomeScreen;
