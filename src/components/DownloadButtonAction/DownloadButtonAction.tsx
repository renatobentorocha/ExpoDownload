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
    <Pressable onPress={onPress} style={styles.button}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c7a0e6",
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
