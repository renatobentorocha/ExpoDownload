import * as React from "react";
import Svg, { SvgProps, Path, PathProps } from "react-native-svg";

type Props = {
  svg?: SvgProps;
  path?: PathProps;
};

export const DownloadIcon = ({ svg, path }: Props) => (
  <Svg width={24} height={24} fill="none" {...svg}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.665 9.916c.22-.22.576-.22.795 0L12 13.455l3.54-3.54a.563.563 0 1 1 .795.796l-3.937 3.937a.563.563 0 0 1-.796 0L7.665 10.71a.563.563 0 0 1 0-.795Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.188c.31 0 .563.251.563.562v10.497a.562.562 0 1 1-1.126 0V3.75c0-.31.252-.563.563-.563Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 13.688c.31 0 .563.251.563.562v5.25a.188.188 0 0 0 .187.188h15a.188.188 0 0 0 .188-.188v-5.25a.562.562 0 1 1 1.125 0v5.25a1.313 1.313 0 0 1-1.313 1.313h-15A1.313 1.313 0 0 1 3.187 19.5v-5.25c0-.31.252-.563.563-.563Z"
      fill="#fff"
      fillOpacity={0.74}
      {...path}
    />
  </Svg>
);
