import Home from '@/src/components/dashboard/banners/Home';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import React from 'react';

const page = () => {
  return (
    <div>
      <BreadcrumbDashboard />
      <Home />
    </div>
  );
};

export default page;
