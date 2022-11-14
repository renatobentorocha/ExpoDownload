import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  NavigationHelpers,
  NavigationState,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import React from "react";

import { BottomBarContent, SlotReturn } from "./BottomBarContent";

type Props = BottomTabBarProps;

function slotItemProps(
  fullRoutes: NavigationState["routes"],
  routesHalf: NavigationState["routes"],
  descriptors: BottomTabDescriptorMap,
  state: TabNavigationState<ParamListBase>,
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
): Array<SlotReturn> {
  return routesHalf.map((route) => {
    const { options } = descriptors[route.key];
    const label = options.title || route.name;
    const focused = fullRoutes[state.index].name === route.name;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: route.name, merge: true, params: {} });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    const tabBarIcon = () =>
      options.tabBarIcon?.({ focused, color: "", size: 0 });

    return {
      tabBarIcon,
      onPress,
      onLongPress,
      label,
      index: route.name,
      focused,
    };
  });
}

export function BottomBarContainer(props: Props) {
  const { state, descriptors, navigation } = props;

  function leftSlot() {
    const left = state.routes.slice(0, Math.ceil(state.routes.length / 2));
    return slotItemProps(state.routes, left, descriptors, state, navigation);
  }

  function rightSlot() {
    const right = state.routes.slice(Math.ceil(state.routes.length / 2));
    return slotItemProps(state.routes, right, descriptors, state, navigation);
  }

  return (
    <BottomBarContent {...props} leftSlot={leftSlot} rightSlot={rightSlot} />
  );
}
