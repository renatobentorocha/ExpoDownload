import React from "react";
import {
  BottomTabNavigationEventMap,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeContainer } from "../screens/Home";
import { BottomBarContainer } from "../components/BottomBar";
import { Screens } from "./Screens";
import { HouseIcon } from "../components/HomeIcon";
import { DownloadIcon } from "../components/DownloadIcon";
import { MagnifyingGlassIcon } from "../components/MagnifyingGlassIcon";
import { UserCircle } from "../components/UserCircleIcon";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { TabBarIconProps } from "../components/BottomBar/BottomBarContent";
import { SearchContainer } from "../screens/Search";

export type TabStackParamList = {
  [Screens.Home]: undefined;
  [Screens.Downloads]: undefined;
  [Screens.Channels]: undefined;
  [Screens.Search]: undefined;
  [Screens.Profile]: undefined;
};

type TabStackProps<T extends keyof TabStackParamList> = BottomTabScreenProps<
  TabStackParamList,
  T
>;

export type TabStackNavigationProp<T extends keyof TabStackParamList> =
  TabStackProps<T>["navigation"];

export type TabStackRouteProp<T extends keyof TabStackParamList> =
  TabStackProps<T>["route"];

const Tab = createBottomTabNavigator<TabStackParamList>();

type GeneralNavigationProps = NavigationHelpers<
  ParamListBase,
  BottomTabNavigationEventMap
>;

function RenderHouseIcon(props: TabBarIconProps) {
  const { focused } = props;
  return (
    <HouseIcon
      path={{
        fill: focused ? "#fff" : "none",
        stroke: "#fff",
      }}
    />
  );
}

function RenderDownloadsIcon(props: TabBarIconProps) {
  const { focused } = props;
  return (
    <DownloadIcon
      path={{
        stroke: focused ? "#fff" : "none",
      }}
    />
  );
}

function RenderSearchIcon(props: TabBarIconProps) {
  const { focused } = props;
  return (
    <MagnifyingGlassIcon
      path={{
        stroke: focused ? "#fff" : "none",
      }}
    />
  );
}

function RenderProfileIcon(props: TabBarIconProps) {
  const { focused } = props;
  return (
    <UserCircle
      path={{
        stroke: focused ? "#fff" : "none",
      }}
    />
  );
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={BottomBarContainer} initialRouteName={Screens.Home}>
      <Tab.Screen
        name={Screens.Home}
        component={HomeContainer}
        options={{ tabBarIcon: RenderHouseIcon }}
      />
      <Tab.Screen
        name={Screens.Downloads}
        component={HomeContainer}
        options={{ tabBarIcon: RenderDownloadsIcon }}
      />
      <Tab.Screen
        name={Screens.Search}
        component={SearchContainer}
        options={{ tabBarIcon: RenderSearchIcon }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={HomeContainer}
        options={{ tabBarIcon: RenderProfileIcon }}
      />
    </Tab.Navigator>
  );
}
