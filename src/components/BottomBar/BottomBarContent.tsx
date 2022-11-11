import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { SvgProps, PathProps } from "react-native-svg";
import { BottomBackground } from "../BottomBackground";

type Props = PropsWithChildren & {
  svg?: SvgProps;
  path?: PathProps;
  bottom?: React.ReactNode;
};

export const BottomBarContent = ({ svg, path, children, bottom }: Props) => {
  return (
    <View>
      <View>
        <BottomBackground {...{ svg, path }} />
        {children}
      </View>
      {bottom}
    </View>
  );
};
