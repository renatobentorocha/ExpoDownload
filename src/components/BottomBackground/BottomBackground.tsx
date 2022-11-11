import React from "react";
import Svg, { SvgProps, Path, PathProps } from "react-native-svg";

type Props = {
  svg?: SvgProps;
  path?: PathProps;
};

export const BottomBackground = ({ svg, path }: Props) => (
  <Svg width={375} height={56} fill="none" {...svg}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M239 0c-8.837 0-15.685 7.506-19.489 15.481C213.722 27.615 201.34 36 187 36c-14.34 0-26.722-8.385-32.511-20.519C150.685 7.506 143.837 0 135 0H8a8 8 0 0 0-8 8v47a1 1 0 0 0 1 1h373a1 1 0 0 0 1-1V8a8 8 0 0 0-8-8H239Z"
      fill="#131263"
      {...path}
    />
  </Svg>
);
