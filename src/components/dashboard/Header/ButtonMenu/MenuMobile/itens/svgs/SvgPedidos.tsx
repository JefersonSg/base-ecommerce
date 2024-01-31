import React, { type FC } from 'react';

interface SvgComponents extends React.SVGProps<SVGSVGElement> {
  isActive: boolean;
}

const SvgPedidos: FC<SvgComponents> = ({ isActive }: { isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M20 33L26 35C26 35 41 32 43 32C45 32 45 34 43 36C41 38 34 44 28 44C22 44 18 41 14 41C10 41 4 41 4 41"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 29C6 27 10 24 14 24C18 24 27.5 28 29 30C30.5 32 26 35 26 35"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 18V10C16 8.89543 16.8954 8 18 8H42C43.1046 8 44 8.89543 44 10V26"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35 8H25V17H35V8Z"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgPedidos;
