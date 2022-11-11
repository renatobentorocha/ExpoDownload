import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "../screens/Home";
import { BottomBarContainer } from "../components/BottomBar";

export function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={BottomBarContainer}>
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="Downloads" component={HomeContainer} />
      <Tab.Screen name="CANAIS" component={HomeContainer} />
      <Tab.Screen name="Busca" component={HomeContainer} />
      <Tab.Screen name="Perfil" component={HomeContainer} />
    </Tab.Navigator>
  );
}
