import React from "react";
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';

type Props = {
  uri: string;
};

export function VideoPlayer({uri}: Props){
  const video = React.useRef(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus>();
  
  function statusIsError() {
    return (status as AVPlaybackStatusError).error !== undefined;
  }

  function isPlaying() {
    return !statusIsError() && (status as AVPlaybackStatusSuccess).isPlaying
  }

  return (
    <View style={{flex: 1}}>
      <Video
        ref={video}        
        source={{
          uri
        }}
        style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height/3}}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View>
        <Button
           title={status?.isPlaying ? 'Pause' : 'Play'}
           onPress={() =>
            status?.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}