import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';

const LazyLoader = lazy(() => import('./../Components/MasterLayout/LazyLoader'));
const NotFound = lazy(() => import('./../Components/NotFound/NotFound404'));
const PageNot = () => {
    return (
       
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                 <NotFound/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PageNot;