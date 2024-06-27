import React, { Fragment, Suspense, lazy } from 'react';
import LazyLoader from './../Components/MasterLayout/LazyLoader';

const Registration = lazy(() => import('./../Components/Registration/Registration'));

const RegistrationPage = () => {
    return (
        
        <Fragment>
            <div>
                <Suspense fallback={<LazyLoader />}>
                    <Registration />
                </Suspense>
            </div>
        </Fragment>
    );
};

export default RegistrationPage;