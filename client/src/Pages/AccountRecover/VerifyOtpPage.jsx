import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../Components/MasterLayout/LazyLoader";
const VerifyOTP =lazy(() => import('../../Components/AccountRecover/VerifyOTP'));
const VerifyOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOTP/>
        </Suspense>
    );
};

export default VerifyOTPPage;