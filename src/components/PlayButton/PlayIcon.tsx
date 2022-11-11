import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PlayIcon = (props: SvgProps) => (
  <Svg width={10} height={13} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.528.121a.978.978 0 0 1 1.027.051l8 5.474c.278.19.445.51.445.854 0 .343-.167.664-.445.854l-8 5.474a.978.978 0 0 1-1.027.05A1.03 1.03 0 0 1 0 11.975V1.026C0 .648.203.3.528.121ZM2 2.944v7.112L7.197 6.5 2 2.944Z"
      fill="#fff"
    />
  </Svg>
);
