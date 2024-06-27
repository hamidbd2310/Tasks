import React, { Fragment } from 'react';
import{BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import CreatePage from './Pages/CreatePage';
import NewPage from './Pages/NewPage';
import ProgressPage from './Pages/ProgressPage';
import CanceledPage from './Pages/CanceledPage';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import PageNot from './Pages/PageNot';
import CompletedPage from './Pages/CompletedPage';
import FullscreenLoader from './Components/MasterLayout/Fullscreen-Loader';
import { getToken } from './Helper/SessionHelper';
import SendOTP from './Pages/AccountRecover/SendOtoPage';
import VerifyOtpPage from './Pages/AccountRecover/VerifyOtpPage';
import CreatePasswordPage from './Pages/AccountRecover/CreatePasswordPage'

const App = () => {
    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage/>} />
                    <Route path="/Create" element={<CreatePage/>} />
                    <Route path="/All" element={<NewPage/>} />
                    <Route path="/Progress" element={<ProgressPage/>} />
                    <Route path="/Canceled" element={<CanceledPage/>} />
                    <Route path="/Completed" element={<CompletedPage/>} />
                    <Route path="/Profile" element={<ProfilePage/>} />
                    <Route path="*" element={<PageNot/>} />
                </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );

    }
    else{
        return (
            <Fragment>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/Login"/>} />
                    <Route path="/Login" element={<LoginPage/>} />
                    <Route path="/Registration" element={<RegistrationPage/>} />
                    <Route path="/SenOtp" element={<SendOTP/>} />
                    <Route path="/VerifyOTP" element={<VerifyOtpPage/>} />
                    <Route path="/CreatePassword" element={<CreatePasswordPage/>} />

                    

                    <Route path="*" element={<Navigate to="/Login"/>} />
                </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }




    
};

export default App;