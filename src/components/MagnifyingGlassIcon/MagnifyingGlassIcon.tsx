import * as React from "react";
import Svg, { SvgProps, Path, PathProps } from "react-native-svg";

type Props = {
  svg?: SvgProps;
  path?: PathProps;
};

export const MagnifyingGlassIcon = ({ svg, path }: Props) => (
  <Svg width={24} height={24} fill="none" {...svg}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.875 3.75a7.125 7.125 0 1 0 0 14.25 7.125 7.125 0 0 0 0-14.25ZM2.25 10.875a8.625 8.625 0 1 1 17.25 0 8.625 8.625 0 0 1-17.25 0Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.913 15.914a.75.75 0 0 1 1.06 0l4.557 4.556a.75.75 0 0 1-1.06 1.06l-4.557-4.556a.75.75 0 0 1 0-1.06Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
  </Svg>
);
