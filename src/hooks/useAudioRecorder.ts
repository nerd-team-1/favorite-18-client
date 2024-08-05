import {useState, useCallback, useMemo} from 'react';
import AudioRecorderPlayer, {
  AudioSet,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
  OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
};

export function useAudioRecorder(fileName: string) {
  const [recording, setRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState<string>('');

  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);

  const startRecording = useCallback(async () => {
    const path = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/${fileName}.m4a`,
      android: `${RNFS.CachesDirectoryPath}/${fileName}.m4a`,
    });

    if (path) {
      setRecordedFilePath(path);

      try {
        await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener(e => {
          // You can handle recording status here if needed
        });
        setRecording(true);
      } catch (error) {
        console.error('Start recording error:', error);
      }
    }
  }, [fileName, audioRecorderPlayer]);

  const stopRecording = useCallback(async () => {
    if (recording) {
      try {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecording(false);

        if (Platform.OS === 'android') {
          const externalPath = `${RNFS.ExternalDirectoryPath}/${fileName}.m4a`;
          await RNFS.moveFile(recordedFilePath, externalPath);
          setRecordedFilePath(externalPath);
        }
      } catch (error) {
        console.error('Stop recording error:', error);
      }
    }
  }, [recording, recordedFilePath, fileName, audioRecorderPlayer]);

  const playRecording = useCallback(async () => {
    if (recordedFilePath) {
      try {
        await audioRecorderPlayer.startPlayer(recordedFilePath);
        audioRecorderPlayer.addPlayBackListener(e => {
          // You can handle playback status here if needed
        });
      } catch (error) {
        console.error('Start playing error:', error);
      }
    }
  }, [recordedFilePath, audioRecorderPlayer]);

  return {
    recording,
    recordedFilePath,
    startRecording,
    stopRecording,
    playRecording,
  };
}
