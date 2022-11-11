import React from "react";
import { Dimensions, View } from "react-native";
import { PlayCircle } from "./PlayCircle";
import { PlayIcon } from "./PlayIcon";

export function PlayButtonContent() {
  return (
    <View
      style={{
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        left: Dimensions.get("screen").width / 2 - 72 / 2,
      }}
    >
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
    </View>
  );
}
