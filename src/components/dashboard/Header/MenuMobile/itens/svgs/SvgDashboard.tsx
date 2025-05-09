import React, { type FC } from 'react';

interface SvgComponents extends React.SVGProps<SVGSVGElement> {
  isActive: boolean;
}

const SvgDashboard: FC<SvgComponents> = ({
  isActive
}: {
  isActive: boolean;
}) => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.45 9.55L13.5 7.5M8 11C8 11.5304 8.21071 12.0391 8.58579 12.4142C8.96086 12.7893 9.46957 13 10 13C10.5304 13 11.0391 12.7893 11.4142 12.4142C11.7893 12.0391 12 11.5304 12 11C12 10.4696 11.7893 9.96086 11.4142 9.58579C11.0391 9.21071 10.5304 9 10 9C9.46957 9 8.96086 9.21071 8.58579 9.58579C8.21071 9.96086 8 10.4696 8 11Z"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.4 17.9999C2.93815 16.838 1.87391 15.2501 1.35478 13.4564C0.835644 11.6626 0.887321 9.75179 1.50265 7.98872C2.11797 6.22564 3.26647 4.69762 4.78899 3.61641C6.3115 2.5352 8.13263 1.95435 10 1.95435C11.8674 1.95435 13.6885 2.5352 15.211 3.61641C16.7335 4.69762 17.882 6.22564 18.4974 7.98872C19.1127 9.75179 19.1644 11.6626 18.6452 13.4564C18.1261 15.2501 17.0619 16.838 15.6 17.9999H4.4Z"
      stroke={isActive ? '#4a4a69' : '#7b8191'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgDashboard;
