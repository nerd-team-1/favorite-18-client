import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Waveform} from '@simform_solutions/react-native-audio-waveform';

interface AudioWaveFormProps {}

function AudioWaveForm({}: AudioWaveFormProps) {
  // const ref = useRef<IAudioWaveformRef>(null);

  return (
    <View style={styles.container}>
      <Waveform
        mode="live"
        // ref={ref}
        candleSpace={2}
        candleWidth={4}
        onRecorderStateChange={recorderState => console.log(recorderState)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AudioWaveForm;
