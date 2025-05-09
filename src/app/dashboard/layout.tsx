import React from 'react';

import HeaderContainer from '@/src/components/dashboard/Header/HeaderContainer';
import './globalsDashboard.css';
import '../colors.css';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={'container_dashboard_color'}>
        <HeaderContainer />
        {children}
      </div>
    </>
  );
}
