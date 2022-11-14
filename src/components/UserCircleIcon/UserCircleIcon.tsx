import * as React from "react";
import Svg, { SvgProps, Path, PathProps } from "react-native-svg";

type Props = {
  svg?: SvgProps;
  path?: PathProps;
};

export const UserCircle = ({ svg, path }: Props) => (
  <Svg width={24} height={24} fill="none" {...svg}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.563a8.438 8.438 0 1 0 0 16.875 8.438 8.438 0 0 0 0-16.875ZM2.437 12a9.563 9.563 0 1 1 19.126 0 9.563 9.563 0 0 1-19.125 0Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 8.063a3.188 3.188 0 1 0 0 6.375 3.188 3.188 0 0 0 0-6.376ZM7.687 11.25a4.312 4.312 0 1 1 8.625 0 4.312 4.312 0 0 1-8.625 0Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 15.563a6.19 6.19 0 0 0-5.518 3.383.563.563 0 0 1-1.002-.51 7.315 7.315 0 0 1 13.04 0 .562.562 0 1 1-1.003.51A6.19 6.19 0 0 0 12 15.562Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
  </Svg>
);
