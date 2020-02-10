/**
 * Album art component for the main music player, contains image and
 * button actions for opacity and other styles
 */

import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const AlbumArt = ({
  url,
  onPress
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={{uri: url}}
      />
    </TouchableOpacity>
  </View>
);

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const ratio = width/350;
/*
width = width - 24;
height = height - 420;
*/

const styles = StyleSheet.create({
  container: {
   	justifyContent: 'center',	
	alignItems: 'center', 
    paddingLeft: 12,
    paddingRight: 12,
  },
  image: {
	width: 275,
	height: 417,
  },
})