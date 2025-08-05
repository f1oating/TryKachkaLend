import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Logo: React.FC = () => {
  const { actualTheme } = useTheme();

  const isDark = actualTheme === "dark";
  const mainColor = isDark ? "white" : "black";
  const innerFill = isDark ? "black" : "white";

  return (
    <svg
      width={110}
      height={60}
      viewBox="0 0 220 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: mainColor }}
    >
      <g stroke={mainColor} strokeWidth={3} fill="none" strokeLinejoin="round">
        <ellipse cx={60} cy={70} rx={35} ry={25} fill="none" />
        <circle cx={95} cy={50} r={18} fill="none" />
        <path
          d="M 110 50 Q 120 45 115 60 Q 120 55 110 60 Z"
          fill={mainColor}
          stroke={mainColor}
          strokeWidth={2}
        />
        <circle cx={90} cy={45} r={5} fill={mainColor} />
        <circle cx={92} cy={43} r={2} fill={innerFill} />
        <path d="M 25 75 Q 10 90 40 85" fill="none" />
      </g>

      <text
        x={130}
        y={75}
        fontFamily="Comic Sans MS, Comic Sans, cursive"
        fontSize={28}
        fill={mainColor}
        fontWeight={700}
      >
        try catch
      </text>
    </svg>
  );
};

export default Logo;
