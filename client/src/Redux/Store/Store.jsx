import {configureStore} from "@reduxjs/toolkit"
import SettingSlice from "../StateSlice/SettingSlice"
import summaryReducer from "../StateSlice/SummarySlice"
import taskReducer from "../StateSlice/TaskSlice"
import  profileSlice  from "../StateSlice/ProfileSlice"


export default configureStore(
    {
       reducer: {
            settings:SettingSlice,
            summary:summaryReducer,
           task:taskReducer,
           profile:profileSlice
        }
    }
)