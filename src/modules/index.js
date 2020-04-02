import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import user from "./user";
import career from "./career";
import skill from "./skill";

const rootReducer = combineReducers({ auth, project, user, career, skill });

export default rootReducer;
