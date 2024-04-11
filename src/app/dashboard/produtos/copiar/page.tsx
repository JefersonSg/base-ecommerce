import React from 'react';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import BodyCopyForm from '@/src/components/dashboard/produtos-lista/copiar/BodyCopyForm';

const page = () => {
  return (
    <div className={`container_dashboard `}>
      <BreadcrumbDashboard text="Update" />
      <BodyCopyForm />
    </div>
  );
};

export default page;
