import React from 'react';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import BodyCopyForm from '@/src/components/dashboard/produtos-lista/copiar/BodyEditForm';

const page = () => {
  return (
    <main className="dashboard_container">
      <div className={`container_dashboard `}>
        <BreadcrumbDashboard text="Update" />
        <BodyCopyForm />
      </div>
    </main>
  );
};

export default page;
