import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../Components/MasterLayout/LazyLoader";
const SendOTP =lazy(() => import('../../Components/AccountRecover/SendOTP'));
const SendOTPPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOTP/>
        </Suspense>
    );
};

export default SendOTPPage;