import React from 'react';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import BodyEditForm from '@/src/components/dashboard/produtos-lista/update/BodyEditForm';

const page = () => {
  return (
    <main className="dashboard_container">
      <div className={`container_dashboard`}>
        <BreadcrumbDashboard text="Update" />
        <BodyEditForm />
      </div>
    </main>
  );
};

export default page;
