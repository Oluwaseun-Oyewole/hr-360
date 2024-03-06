import auth from "@/app/auth/login/store/slice";
import dashboard from "@/app/dashboard/store/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dashboard,
  auth,
});

export default rootReducer;
