import React from "react";
import Svg, {
  Circle,
  Path,
  G,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

import { Image } from "react-native";

import Verified from "../../../Assets/verified.png";

export const PassportSVG = () => {
  return (
    <Svg
      width="286"
      height="282"
      viewBox="0 0 286 282"
      fill="none"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      }}
    >
      {/* Linear Gradient Definitions */}
      <LinearGradient
        id="paint0_linear_1075_8526"
        x1="78.0563"
        y1="79.0063"
        x2="78.0563"
        y2="217.337"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#79D17C" />
        <Stop offset="1" stopColor="#79D17C" stopOpacity="0.2" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1075_8526"
        x1="170.492"
        y1="128.477"
        x2="163.115"
        y2="177.581"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#79D17C" />
        <Stop offset="1" stopColor="#79D17C" stopOpacity="0.2" />
      </LinearGradient>

      {/* Group with opacity */}
      <G opacity="0.3" filter="url(#filter0_f_1075_8526)">
        <Circle cx="144.38" cy="141.207" r="106.207" fill="#79D17C" />
      </G>

      {/* Inner circle */}
      <Circle cx="154.035" cy="88.7933" r="22.069" fill="#79D17C" />

      {/* White strokes */}
      <Path
        d="M145.4 88.9304L151.68 95.51L162.671 83.9957"
        stroke="white"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rectangle group 1 with drop shadow */}
      <G>
        <Rect
          x="19"
          y="77.1156"
          width="115.862"
          height="154.483"
          rx="11.0345"
          transform="rotate(-8.59828 19 77.1156)"
          fill="#79D17C"
          fillOpacity="0.5"
        />
      </G>

      {/* Rectangle group 2 with shadow and gradient */}
      <G>
        <Rect
          x="19"
          y="72.1156"
          width="115.862"
          height="154.483"
          rx="11.0345"
          transform="rotate(-8.59828 19 72.1156)"
          fill="white"
        />
        <Rect
          x="19.785"
          y="72.6944"
          width="114.483"
          height="153.104"
          rx="10.3449"
          transform="rotate(-8.59828 19.785 72.6944)"
          stroke="#79D17C"
          strokeOpacity="0.3"
          strokeWidth="1.37931"
        />
        <Rect
          x="27.4465"
          y="79.0063"
          width="101.219"
          height="138.331"
          rx="4.13794"
          transform="rotate(-8.59828 27.4465 79.0063)"
          fill="url(#paint0_linear_1075_8526)"
        />
      </G>

      {/* Circle and paths inside the rectangle */}
      <Circle
        cx="87.828"
        cy="139.828"
        r="26.207"
        transform="rotate(-8.59828 87.828 139.828)"
        stroke="white"
        strokeWidth="2.75863"
      />
      <Path
        d="M104.093 118.233C99.9021 123.8 93.6124 127.793 86.1783 128.917C78.7443 130.041 71.5552 128.087 65.906 124.007"
        stroke="white"
        strokeWidth="2.75863"
      />
      <Path
        d="M71.5635 161.423C75.7542 155.856 82.0439 151.863 89.4779 150.738C96.9119 149.614 104.101 151.569 109.75 155.649"
        stroke="white"
        strokeWidth="2.75863"
      />
      <Path
        d="M61.9155 143.746L113.74 135.91"
        stroke="white"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M101.466 137.766C102.577 145.113 101.932 151.945 100.058 157.035C98.1644 162.177 95.1615 165.224 91.746 165.74C88.3305 166.257 84.5611 164.234 81.2319 159.881C77.9371 155.573 75.3007 149.237 74.1898 141.89C73.0789 134.543 73.7241 127.711 75.598 122.621C77.4914 117.479 80.4944 114.432 83.9098 113.916C87.3253 113.399 91.0947 115.422 94.4239 119.775C97.7187 124.083 100.355 130.419 101.466 137.766Z"
        stroke="white"
        strokeWidth="2.75863"
      />
      <Path
        d="M83.9099 113.916L91.7461 165.74"
        stroke="white"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rectangle group 3 */}
      <G>
        <Rect
          x="137.42"
          y="109.586"
          width="131.035"
          height="92.4141"
          rx="11.0345"
          transform="rotate(8.54379 137.42 109.586)"
          fill="#79D17C"
          fillOpacity="0.5"
        />
      </G>

      {/* Rectangle group 4 */}
      <G>
        <Rect
          x="137.42"
          y="102.586"
          width="131.035"
          height="92.4141"
          rx="11.0345"
          transform="rotate(8.54379 137.42 102.586)"
          fill="white"
        />
        <Rect
          x="137.999"
          y="103.371"
          width="129.656"
          height="91.0348"
          rx="10.3449"
          transform="rotate(8.54379 137.999 103.371)"
          stroke="#79D17C"
          strokeOpacity="0.3"
          strokeWidth="1.37931"
        />
      </G>

      {/* Path inside the rectangle */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M166.599 154.393C173.755 155.468 180.428 150.538 181.504 143.382C182.579 136.225 177.649 129.552 170.492 128.477C163.336 127.402 156.663 132.332 155.587 139.488C154.512 146.645 159.442 153.318 166.599 154.393ZM144.395 170.617C147.614 162.311 156.504 157.061 165.984 158.485C175.464 159.909 182.419 167.539 183.055 176.425C183.219 178.705 181.061 180.277 178.801 179.938L147.429 175.225C145.169 174.885 143.569 172.748 144.395 170.617Z"
        fill="url(#paint1_linear_1075_8526)"
      />

      {/* Final strokes */}
      <Path
        d="M203.84 143.25L229.074 147.041"
        stroke="#79D17C"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M202.201 154.162L239.029 159.695"
        stroke="#79D17C"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M200.562 165.075L221.022 168.148"
        stroke="#79D17C"
        strokeWidth="2.75863"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
