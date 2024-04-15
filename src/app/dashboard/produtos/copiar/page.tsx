import React from 'react';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <main className="dashboard_container">
      <div className={`container_dashboard `}>
        <BreadcrumbDashboard text="Update" />
      </div>
    </main>
  );
};

export default page;
