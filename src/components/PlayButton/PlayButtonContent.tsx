import React from "react";
import { View } from "react-native";
import { PlayCircle } from "./PlayCircle";
import { PlayIcon } from "./PlayIcon";

export function PlayButtonContent() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        backgroundColor: "#131263",
      }}
    >
      <PlayCircle />
      <PlayIcon style={{ position: "absolute" }} />
    </View>
  );
}
