import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { DownloadButtonAction } from "../../components/DownloadButtonAction/DownloadButtonAction";
import { PexelsVideo } from "../../hooks/usePexelsAPI";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = {
  video: PexelsVideo;
  onStart: (id: number) => void;
  onPause: () => void;
  onResume: () => void;
};

export function HomeContainerContent({
  video,
  onStart,
  onPause,
  onResume,
}: Props) {
  function start(id: number) {
    onStart(id);
  }

  function pause() {
    onPause();
  }

  function resume() {
    onResume();
  }

  return (
    <ImageBackground source={{ uri: video.image }} style={styles.image}>
      <View style={styles.actions}>
        <DownloadButtonAction onPress={() => start(video.id)}>
          <AntDesign name="download" size={24} color="white" />
        </DownloadButtonAction>
        <DownloadButtonAction onPress={pause}>
          <AntDesign name="pause" size={24} color="white" />
        </DownloadButtonAction>
        <DownloadButtonAction onPress={resume}>
          <Entypo name="controller-play" size={24} color="white" />
        </DownloadButtonAction>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    height: 90,
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f6ebfe",
  },
});
