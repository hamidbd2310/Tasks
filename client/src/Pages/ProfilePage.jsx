import React, { Fragment, Suspense, lazy } from 'react';
import MasterLayout from './../Components/MasterLayout/MasterLayout';
import LazyLoader from './../Components/MasterLayout/LazyLoader';
const Profile = lazy(() => import('./../Components/Profile/Profile'));

const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Profile />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;