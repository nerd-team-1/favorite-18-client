import {useAudioRecorder} from '@/hooks/useAudioRecorder';
import usePermission from '@/hooks/usePermission';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

function ModelHomeScreen() {
  usePermission('AUDIO');
  usePermission('READ_AUDIO');

  const [fileName, setFileName] = useState<string>('test');
  const {
    recording,
    recordedFilePath,
    startRecording,
    stopRecording,
    playRecording,
  } = useAudioRecorder(fileName);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter file name"
        value={fileName}
        onChangeText={setFileName}
      />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title="Play Recording"
        onPress={playRecording}
        disabled={!recordedFilePath}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default ModelHomeScreen;
