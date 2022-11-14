import * as React from "react";
import Svg, { SvgProps, Path, PathProps } from "react-native-svg";

type Props = {
  svg?: SvgProps;
  path?: PathProps;
};

export const HouseIcon = ({ svg, path }: Props) => (
  <Svg width={24} height={24} fill="none" {...svg}>
    <Path
      d="m20.51 9.722-7.501-6.82a1.494 1.494 0 0 0-2.018.001l-7.5 6.819a1.503 1.503 0 0 0-.49 1.11v8.634c-.005.377.129.742.375 1.027A1.492 1.492 0 0 0 4.5 21h4.497a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 0 .75.75h4.505c.247.003.49-.057.707-.174A1.507 1.507 0 0 0 21 19.5v-8.668a1.504 1.504 0 0 0-.49-1.11Z"
      fill="#fff"
      {...path}
    />
  </Svg>
);
