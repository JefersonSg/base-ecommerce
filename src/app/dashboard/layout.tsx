import React from 'react';

import HeaderContainer from '@/src/components/dashboard/Header/HeaderContainer';
import './globalsDashboard.css';
import { typeFirst, typeFirstDashboard } from '@/src/shared/functions/fonts';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${typeFirst.variable} ${typeFirstDashboard.variable} body_dashboard`}
    >
      <HeaderContainer />
      {children}
    </body>
  );
}
