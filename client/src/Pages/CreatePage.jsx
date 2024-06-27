import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';
import LazyLoader from './../Components/MasterLayout/LazyLoader';
const Create = lazy(() => import('./../Components/Create/Create'));

const CreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Create />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CreatePage;