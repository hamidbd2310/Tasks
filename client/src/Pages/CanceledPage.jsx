import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';
import LazyLoader from './../Components/MasterLayout/LazyLoader';
const Canceled = lazy(() => import('./../Components/Canceled/Canceled'));

const CanceledPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Canceled />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default CanceledPage;