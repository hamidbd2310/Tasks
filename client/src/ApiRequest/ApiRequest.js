import axios from "axios";
import { ErrorToast, SuccessToast } from "../../src/Helper/FormHelper";
import store from "../Redux/Store/Store";
import { HideLoader, ShowLoader } from "../Redux/StateSlice/SettingSlice";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  removeSessions,
  setUserDetails,
} from "../Helper/SessionHelper";
import { toast } from "react-hot-toast";
import {
  SetCanceledTask,
  SetCompletedTask,
  SetNewTask,
  SetProgressTask,
} from "../Redux/StateSlice/TaskSlice";
import { SetSummary } from "../Redux/StateSlice/SummarySlice";
import { SetProfile } from "../Redux/StateSlice/ProfileSlice";


const AxiosHeader = { headers: { token: getToken() } };

export function NewTaskRequest(title, description) {
  store.dispatch(ShowLoader());

  let URL = "api/createTask";
  let PostBody = { title: title, description: description, status: "New" };

  return axios
    .post(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "Success") {
        toast.success("New Task Created");
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast(err);
      store.dispatch(HideLoader());
      return false;
    });
}

export function LoginRequest(email, password) {
  store.dispatch(ShowLoader());
  const URL = `api/login`;
  const PostBody = { email, password };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "Success") {
        setToken(data.token);
        setUserDetails(data.data);
        SuccessToast(data.message || "Login Successful.");
        return true;
      } else {
        ErrorToast(data.message || "Login Failed.");
        return false;
      }
    })
    .catch((error) => {
      store.dispatch(HideLoader());
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        ErrorToast(error.response.data.message);
      } else {
        ErrorToast("An unexpected error occurred.");
      }
      return false;
    });
}

export function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password
) {
  store.dispatch(ShowLoader());

  const URL = `api/registration`;
  const PostBody = { email, firstName, lastName, mobile, password };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.data.status === "Success") {
        toast.success(res.data.message || "Registration Successful.");
        return true;
      } else {
        ErrorToast(res.data.message || "Registration Failed.");
        return false;
      }
    })
    .catch((error) => {
      store.dispatch(HideLoader());
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        ErrorToast(error.response.data.message);
      } else {
        ErrorToast("An unexpected error occurred.");
      }
      return false;
    });
}

export function TaskListByStatus(Status) {
  store.dispatch(ShowLoader());
  let URL = "api/getTasksByStatus/" + Status;
  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "Success") {
        if (Status === "New") {
          store.dispatch(SetNewTask(res.data["data"]));
        } else if (Status === "Completed") {
          store.dispatch(SetCompletedTask(res.data["data"]));
        } else if (Status === "Canceled") {
          store.dispatch(SetCanceledTask(res.data["data"]));
        } else if (Status === "Progress") {
          store.dispatch(SetProgressTask(res.data["data"]));
        }
      } else {
        ErrorToast("Something Went Wrong");
      }
    })
    .catch((err) => {
      ErrorToast("Something Went Wrong");
      store.dispatch(HideLoader());
      removeSessions();
    });
}

export function SummaryRequest() {
  store.dispatch(ShowLoader());
  let URL = "api/countTasksByStatus";
  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "Success") {
        store.dispatch(SetSummary(res.data["data"]));
      } else {
        ErrorToast("Something Went Wrong");
      }
    })
    .catch((err) => {
      ErrorToast(err);
      store.dispatch(HideLoader());
    });
}

export function DeleteRequest(id) {
  store.dispatch(ShowLoader());
  let URL = "api/deleteTask/" + id;
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "Success") {
        toast.success("Delete Successful");
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast("Something Went Wrong");
      removeSessions();
      store.dispatch(HideLoader());
      return false;
    });
}

export function UpdateStatusRequest(id, status) {
  store.dispatch(ShowLoader());
  const URL = `api/updateTask/${id}/${status}`;

  return axios.get(URL).then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;

      if (data.status === "Success") {
          toast.success("Status Updated");
          return true;
      } else {
          ErrorToast("Something Went Wrong");
          return false;
      }
  }).catch((err) => {
      ErrorToast("Something Went Wrong");
      store.dispatch(HideLoader());
      removeSessions();
      return false;
  });
}



export function GetProfileDetails(){
  store.dispatch(ShowLoader())
  let URL="api/getProfileDetails";
  axios.get(URL,AxiosHeader).then((res)=>{
      store.dispatch(HideLoader())
      const { data } = res;
    if (data.status === "Success"){
          store.dispatch(SetProfile(res.data['data']))
      }
      else{
          ErrorToast("Something Went Wrong")
      }
  }).catch((err)=>{
      ErrorToast(err)
      store.dispatch(HideLoader())
  });
}

export async function ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo) {
  store.dispatch(ShowLoader());
    let PostBody={ email, firstName, lastName, mobile, password, photo }
    let UserDetails={ email, firstName, lastName, mobile, photo }


  try {
    const response = await axios.post('/api/profileUpdate',PostBody , { headers: AxiosHeader });
    store.dispatch(HideLoader());
    const { data } = response;
    if (data.status === "Success") {
      toast.success("Profile updated successfully");
      setUserDetails(UserDetails);
      return true;
    } else {
      ErrorToast("Failed to update profile");
      return false;
    }
  } catch (error) {
    store.dispatch(HideLoader());
    ErrorToast(error);
    removeSessions();
    return false;
  }
}

export function RecoverVerifyEmailRequest(email) {
  store.dispatch(ShowLoader());
  let URL = "api/verifyEmail/" + email;

  return axios.get(URL).then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "success") {
        toast.success("A 6 Digit verification code has been sent to your email address.");
          setEmail(email)
          return true;
      } else if (data.status === "failed") {
          ErrorToast(data.message);
          return false;
      } else {
          ErrorToast("An unexpected error occurred.");
          return false;
      }
  }).catch((err) => {
      ErrorToast(err.message || "An error occurred");
      store.dispatch(HideLoader());
      return false;
  });
}


export function RecoverVerifyOTPRequest(email, OTP) {
  store.dispatch(ShowLoader());
  let URL = `api/verifyOTP/${email}/${OTP}`;

  return axios.get(URL).then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;
      if (data.status === "success") {
        toast.success("Code Verification Success");
          setOTP(OTP)
          return true;
      } else if (data.status === "failed") {
          ErrorToast(data.message);
          return false;
      } else {
          ErrorToast("An unexpected error occurred.");
          return false;
      }
  }).catch((err) => {
      ErrorToast(err.message || "An error occurred");
      store.dispatch(HideLoader());
      return false;
  });
}


export function RecoverResetPassRequest(email, otp, password) {
  store.dispatch(ShowLoader());
  const URL = "api/passwordReset";
  const PostBody = { email, otp, password };

  return axios.post(URL, PostBody).then((res) => {
      store.dispatch(HideLoader());
      const { data } = res;

      if (data.status === "success") {
          toast.success("NEW PASSWORD CREATED");
          localStorage.clear();
          return true;
      } else if (data.status === "failed") {
          ErrorToast(data.message );
          return false;
      } else {
          ErrorToast("Unexpected response received");
          return false;
      }
  }).catch((err) => {
      ErrorToast(err.message || "Something Went Wrong");
      store.dispatch(HideLoader());
      return false;
  });
}