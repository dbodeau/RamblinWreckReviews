/* This is previous team code and our team did not touch this file.Would be used for sending “nag” emails. 
Page link: /professor/email-notifications */
import './css/Professor_EmailNotifications.css';
import AWS_Authenticator from './AWS_Authenticator';
import AuthStatusEnum from './AuthStatusEnum';

function Professor_EmailNotifications() {

}

export default AWS_Authenticator(Professor_EmailNotifications, AuthStatusEnum.SUPERUSER);