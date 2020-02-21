/**
 * SeekBar for the react native video player. Uses styling,
 * start, end and seek for the main player controls
 */

import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Slider from 'react-native-slider';

// Padding for the physical position may need to be updated
function pad(n, width, z=0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(String(z)) + n;
}

// TODO This conversion may not be working
const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

/**
 * SeekBar for the main full player allows fwd and rwd of audio
 * @param 
 */
const SeekBar = ({
  chapterDuration,
  currentPosition,
  onSeek,
  onSlidingStart,
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(chapterDuration - currentPosition);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{flex: 1}} />
        <Text style={[styles.text, {width: 40}]}>
          {chapterDuration > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(chapterDuration, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        onValueChange={() => console.log("Value changed!")}
        value={currentPosition}
        style={styles.slider}
        minimumTrackTintColor='purple'
        maximumTrackTintColor='rgba(192,192,192,0.8)'
        thumbStyle={styles.thumb}
        trackStyle={styles.track}/>
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'purple',
  },
  text: {
    color: 'purple', 
    fontSize: 12,
    textAlign:'center',
  }
});
