import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { PropsWithChildren } from "react";
import {
  Dimensions,
  View,
  Text,
  ViewStyle,
  Pressable,
  PressableProps,
} from "react-native";

import { PlayButtonContainer } from "../PlayButton";
import { BottomBarBackground } from "./BottomBarBackground";

export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export type SlotReturn = {
  tabBarIcon: () => React.ReactNode;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  index: string;
  focused: boolean;
};

type Props = BottomTabBarProps & {
  leftSlot: () => SlotReturn[];
  rightSlot: () => SlotReturn[];
};

type BottomTabBarSlot = PropsWithChildren & { style?: ViewStyle };
type BottomTabBarItemsWrapper = PropsWithChildren & { style?: ViewStyle };
type BottomTabBarItemText = { style?: ViewStyle; text: string };
type BottomTabBarItem = PropsWithChildren & {
  style?: ViewStyle;
  pressable?: PressableProps;
};

function BottomBarItem({ style, pressable, children }: BottomTabBarItem) {
  return (
    <Pressable {...pressable}>
      <View style={[{ alignItems: "center" }, style]}>{children}</View>
    </Pressable>
  );
}

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
          width: (Dimensions.get("screen").width - 72) / 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function BottomBarContent(props: Props) {
  function renderLeftSlot() {
    return props.leftSlot().map((slot) => {
      const { onPress, onLongPress, label, focused } = slot;
      return (
        <BottomBarItem key={slot.index} pressable={{ onPress, onLongPress }}>
          {slot.tabBarIcon()}
          <BottomBarItemText text={label} />
        </BottomBarItem>
      );
    });
  }

  function renderRightSlot() {
    return props.rightSlot().map((slot) => {
      const { onPress, onLongPress, label } = slot;
      return (
        <BottomBarItem key={slot.index} pressable={{ onPress, onLongPress }}>
          {slot.tabBarIcon()}
          <BottomBarItemText text={label} />
        </BottomBarItem>
      );
    });
  }

  return (
    <BottomBarBackground
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
        <BottomBarSlot>{renderLeftSlot()}</BottomBarSlot>
        <PlayButtonContainer />
        <BottomBarSlot>{renderRightSlot()}</BottomBarSlot>
      </BottomBarItemsWrapper>
    </BottomBarBackground>
  );
}
