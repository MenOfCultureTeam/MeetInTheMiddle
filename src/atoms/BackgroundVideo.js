import React from 'react';

import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native'
const BackgroundVideo = () => {
  return (
        <Video source ={require('../images/loginAnimatedBG.mp4')}
            style={styles.backgroundVideo}
            muted={true}
            repeat={true}
            resizeMode={"cover"}
            rate={1.0}
            ignoreSilentSwitch={"obey"}/>

  );
};

export default BackgroundVideo;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  });