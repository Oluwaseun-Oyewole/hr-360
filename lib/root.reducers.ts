import dashboard from "@/app/dashboard/store/slice";
import auth from "@/app/login/store/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dashboard,
  auth,
});

export default rootReducer;
