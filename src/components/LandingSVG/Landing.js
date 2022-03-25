import React from 'react';
import './Landing.css';

const Landing = ({ className }) => {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 2813 3097"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="vink">
        <circle className="primary" cx="1454" cy="1587.5" r="409" fill="#1875CB"></circle>
        <g id="solos circles">
          <circle cx="942.443" cy="159.924" r="59.6777" fill="#1875CB" />
          <circle cx="393.408" cy="1077.82" r="59.6777" fill="#1875CB" />
          <circle cx="649.738" cy="1996.29" r="59.1094" fill="#1875CB" />
          <circle cx="512.764" cy="2627.17" r="59.6777" fill="#1875CB" />
          <circle cx="1696.09" cy="2627.17" r="59.6777" fill="#1875CB" />
          <circle cx="2394.03" cy="2567.49" r="59.6777" fill="#1875CB" />
          <circle cx="2320.15" cy="1587.64" r="59.6777" fill="#1875CB" />
          <circle cx="2579.32" cy="972.678" r="59.6777" fill="#1875CB" />
          <circle cx="1514.21" cy="648.713" r="59.6777" fill="#1875CB" />
          <circle cx="1969.47" cy="99.6777" r="59.1094" fill="#1875CB"></circle>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            values="-1 260 250; 0 260 250; -1 260 250;0 260 250; -1 260 250 ;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250;-1 260 250"
            repeatCount="indefinite"
          />
        </g>
        <g id="circles">
          <circle cx="641.213" cy="555.502" r="127.881" fill="#1875CB" />
          <circle cx="2260.47" cy="568.006" r="139.816" fill="#1875CB" />
          <circle cx="2486.68" cy="1973.56" r="152.32" fill="#1875CB" />
          <circle cx="168.338" cy="1663.8" r="123.334" fill="#1875CB" />
          <circle cx="1097.61" cy="2735.16" r="214.84" fill="#1875CB" />
        </g>
        <g>
          <animate attributeName="opacity" dur="2s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
          <line
            className="lines"
            x1="665.818"
            y1="550.598"
            x2="1456.23"
            y2="1571.76"
            stroke="#1875CB"
            strokeWidth="23"
            strokeLinecap="round"
          />
          <line
            className="lines"
            x1="1452.28"
            y1="1571.74"
            x2="2244.26"
            y2="569.715"
            stroke="#1875CB"
            strokeWidth="23"
            strokeLinecap="round"
          />
          <line
            className="lines"
            x1="1468.97"
            y1="1581.14"
            x2="2479.76"
            y2="1958.69"
            stroke="#1875CB"
            strokeWidth="23"
            strokeLinecap="round"
          />
          <line
            className="lines"
            x1="1461.73"
            y1="1602.3"
            x2="1111.03"
            y2="2726.6"
            stroke="#1875CB"
            strokeWidth="23"
            strokeLinecap="round"
          />
          <line
            className="lines"
            x1="1443.37"
            y1="1600.05"
            x2="179.846"
            y2="1674.07"
            stroke="#1875CB"
            strokeWidth="23"
            strokeLinecap="round"
          />
        </g>
        <g id="logo">
          <g id="Group 14">
            <circle id="Ellipse 3" cx="1453.96" cy="1744.42" r="43.0529" fill="#F2F2F2" />
            <circle id="Ellipse 4" cx="1312.75" cy="1513.66" r="43.0529" fill="#F2F2F2" />
            <circle id="Ellipse 5" cx="1593.45" cy="1513.66" r="43.0529" fill="#F2F2F2" />
            <path
              id="Rectangle 12"
              d="M1532.99 1444.68L1520.4 1464.95C1520.4 1464.95 1479.46 1448.89 1452.05 1449C1425.09 1449.11 1384.89 1464.95 1384.89 1464.95L1373.7 1444.68C1373.7 1444.68 1420.49 1425.13 1452.05 1424.89C1484.59 1424.64 1532.99 1444.68 1532.99 1444.68Z"
              fill="#C5C5C5"
            />
            <rect
              id="Rectangle 15"
              x="1331.69"
              y="1570.02"
              width="25.8317"
              height="153.533"
              transform="rotate(-31 1331.69 1570.02)"
              fill="#F2F2F2"
            />
            <rect
              id="Rectangle 16"
              x="1553.7"
              y="1556.71"
              width="25.8317"
              height="153.533"
              transform="rotate(31 1553.7 1556.71)"
              fill="#F2F2F2"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Landing;
