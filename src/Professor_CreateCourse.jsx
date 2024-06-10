/* This is previous team code and our team did not touch this file. We suggest this file gets deleted but talk to Donna first*/
import "./css/Professor_CreateCourse.css";
import AWS_Authenticator from './AWS_Authenticator';
import AuthStatusEnum from "./AuthStatusEnum";

function Professor_CreateCourse() {

}

export default AWS_Authenticator(Professor_CreateCourse, AuthStatusEnum.SUPERUSER);