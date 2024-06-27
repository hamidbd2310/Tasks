import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';
import LazyLoader from './../Components/MasterLayout/LazyLoader';
const Completed = lazy(() => import('./../Components/Completed/Completed'));

const CompletedPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Completed />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletedPage;