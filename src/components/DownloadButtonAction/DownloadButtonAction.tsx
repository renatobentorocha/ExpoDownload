import React, { PropsWithChildren } from "react";
import { Pressable, StyleSheet } from "react-native";

type DownloadButtonActionProps = PropsWithChildren & {
  onPress: () => void;
};

export function DownloadButtonAction({
  onPress,
  children,
}: DownloadButtonActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed
          ? { backgroundColor: "#d3bce6" }
          : { backgroundColor: "#c7a0e6" },
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
