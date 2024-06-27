import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IsEmpty, IsMobile, IsEmail, ErrorToast } from "../../Helper/FormHelper";
import { RegistrationRequest } from "../../ApiRequest/ApiRequest";

const Registration = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const mobileRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const onRegistration = async () => {
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const mobile = mobileRef.current.value;
        const password = passwordRef.current.value;

        if (!IsEmail(email)) {
            ErrorToast("Valid Email Required");
        } else if (IsEmpty(firstName)) {
            ErrorToast("First Name Required");
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required");
        } else if (!IsMobile(mobile)) {
            ErrorToast("Valid Mobile Number Required");
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required");
        } else {
            try {
                const result = await RegistrationRequest(email, firstName, lastName, mobile, password);
                if (result === true) {
                    navigate("/login");
                } else {
                    ErrorToast(res.data.message);
                }
            } catch (error) {
                ErrorToast(res.data.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card animated fadeIn p-3">
                        <div className="card-body">
                            <h4 className="card-title">Sign Up</h4>
                            <hr />
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="p-2">
                                        <label>Email Address</label>
                                        <input ref={emailRef} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                    </div>
                                    <div className="p-2">
                                        <label>First Name</label>
                                        <input ref={firstNameRef} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="p-2">
                                        <label>Last Name</label>
                                        <input ref={lastNameRef} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="p-2">
                                        <label>Mobile Number</label>
                                        <input ref={mobileRef} placeholder="Mobile" className="form-control animated fadeInUp" type="tel" />
                                    </div>
                                    <div className="p-2">
                                        <label>Password</label>
                                        <input ref={passwordRef} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    </div>
                                </div>
                                <div className="row mt-2 p-0">
                                    <div className="p-2">
                                        <button onClick={onRegistration} className="btn w-100 btn-success animated fadeInUp">Next</button>
                                        <div className="text-center w-100 pt-3">
                                            <span>Already have an account? </span><Link className=" text-success" to="/Login">Sign In</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
