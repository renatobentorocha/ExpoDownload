import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { PropsWithChildren } from "react";
import { Dimensions, View, Text, ViewStyle } from "react-native";
import { PlayButtonContainer } from "../PlayButton";
import { BottomBarContent } from "./BottomBarContent";

type Props = BottomTabBarProps;

type BottomTabBarSlot = PropsWithChildren & { style?: ViewStyle };
type BottomTabBarItemsWrapper = PropsWithChildren & { style?: ViewStyle };
type BottomTabBarItemText = { style?: ViewStyle; text: string };

function BottomBarItemText({ style, text }: BottomTabBarItemText) {
  return (
    <Text
      style={[
        { fontSize: 12, lineHeight: 16, fontWeight: "400", color: "#fff" },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

function BottomBarItemsWrapper({ style, children }: BottomTabBarItemsWrapper) {
  return (
    <View
      style={[
        {
          width: Dimensions.get("screen").width,
          position: "absolute",
          height: 56,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function BottomBarSlot({ style, children }: BottomTabBarSlot) {
  return (
    <View
      style={[
        {
          width: Dimensions.get("screen").width / 2 - 72,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function BottomBarContainer(props: Props) {
  return (
    <BottomBarContent
      svg={{
        width: Dimensions.get("screen").width,
        style: { backgroundColor: "#0C0C33" },
      }}
      path={{
        scaleX: Dimensions.get("screen").width / 375,
      }}
      bottom={
        <View
          style={{ height: props.insets.bottom, backgroundColor: "#131263" }}
        />
      }
    >
      <BottomBarItemsWrapper>
        <BottomBarSlot style={{ paddingLeft: 16 }}>
          <BottomBarItemText text="Home" />
          <BottomBarItemText text="Download" />
        </BottomBarSlot>
        <PlayButtonContainer />
        <BottomBarSlot style={{ paddingRight: 16 }}>
          <BottomBarItemText text="Busca" />
          <BottomBarItemText text="Perfil" />
        </BottomBarSlot>
      </BottomBarItemsWrapper>
    </BottomBarContent>
  );
}
