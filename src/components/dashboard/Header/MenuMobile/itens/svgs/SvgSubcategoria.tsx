import React, { type FC } from 'react';

interface SvgComponents extends React.SVGProps<SVGSVGElement> {
  isActive: boolean;
}

const SvgSubcategorias: FC<SvgComponents> = ({
  isActive
}: {
  isActive: boolean;
}) => (
  <svg
    width="28"
    height="25"
    viewBox="0 0 28 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 23H24V25H18V23ZM18 15H26V17H18V15ZM18 7.00001H28V9.00001H18V7.00001ZM13 1.00001H15V25H13V1.00001ZM8.586 0.959008L5 4.24901L1.412 0.958008L0 2.37301L5 7.00001L10 2.37301L8.586 0.959008Z"
      fill={isActive ? '#4a4a69' : '#7b8191'}
    />
  </svg>
);

export default SvgSubcategorias;
