import React, { Fragment, useRef } from 'react';
import { Link } from "react-router-dom";
import { ErrorToast, IsEmail, IsEmpty } from '../../Helper/FormHelper';
import { LoginRequest } from '../../ApiRequest/ApiRequest';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const SubmitLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!IsEmail(email)) {
            ErrorToast("Valid Email Required");
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required");
        } else {
            LoginRequest(email, password).then((result) => {
                if (result === true) {
                    window.location.href = "/";
                } else {
                    ErrorToast(res.data.message);
                }
            }).catch((error) => {
                ErrorToast(res.data.message);
            });
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SIGN IN</h4>
                                <br />
                                <input ref={emailRef} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                <br />
                                <input ref={passwordRef} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                <br />
                                <button onClick={SubmitLogin} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                                <hr />
                                <div className="float-end mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/Registration">Sign Up</Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/SenOtp">Forget Password</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
