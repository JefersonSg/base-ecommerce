import React, { type FC } from 'react';

interface SvgComponents extends React.SVGProps<SVGSVGElement> {}

const SvgSetaBaixo: FC<SvgComponents> = () => (
  <svg
    width="10"
    height="7"
    viewBox="0 0 10 7"
    stroke="black"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.5 0.5L5 5.5L9.5 0.5" stroke="black" />
  </svg>
);

export default SvgSetaBaixo;
