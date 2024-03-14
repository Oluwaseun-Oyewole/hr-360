import dashboard from "@/app/dashboard/store/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dashboard,
});

export default rootReducer;
