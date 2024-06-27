import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';
import LazyLoader from './../Components/MasterLayout/LazyLoader';
const New = lazy(() => import('./../Components/New/New'));
const NewPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <New />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NewPage;