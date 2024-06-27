import React, { Fragment, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { ErrorToast } from '../../Helper/FormHelper';
import { RecoverVerifyOTPRequest } from '../../ApiRequest/ApiRequest';
import { getEmail } from '../../Helper/SessionHelper';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey"
  };

  const submitOTP = () => {
    if (OTP.length === 4) {
      RecoverVerifyOTPRequest(getEmail(), OTP).then((result) => {
        if (result === true) {
          navigate("/CreatePassword");
        }
      });
    } else {
      ErrorToast("Enter 4 Digit Code");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-4 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>OTP VERIFICATION</h4>
                <ReactCodeInput onChange={setOTP} inputStyle={defaultInputStyle} fields={4} />
                <br /><br />
                <button onClick={submitOTP} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyOTP;
