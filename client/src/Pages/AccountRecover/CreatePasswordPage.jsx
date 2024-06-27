import React, { lazy, Suspense} from 'react';
import LazyLoader from "../../Components/MasterLayout/LazyLoader";
const CreatePassword =lazy(() => import('../../Components/AccountRecover/CreatePassword'));
const CreatePasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <CreatePassword/>
        </Suspense>
    );
};
export default CreatePasswordPage;