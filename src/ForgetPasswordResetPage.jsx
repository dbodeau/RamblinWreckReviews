/*
This is the ForgotPassword page: the purpose of this is if a student forgets thier password then they are able to reset it. They land on this
page from the clicking forgot password on the login page. They will enter their username/email and it will send them a 6 digit code. After that
a verification code and new password input pop up and they submit again which resets there password. If they need a new code they will press resend 
code which calls the same handle submit function
*/

import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { useState, useEffect } from 'react';
import { resetPassword, confirmResetPassword } from '@aws-amplify/auth';
import { FaEyeSlash, FaEye } from 'react-icons/fa';


Amplify.configure(awsconfig)

export default function ForgetPasswordResetPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false); /*this is for if user is in password input shows requirments of password*/

    const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isCodeSent){ /*false always apon first call*/
        try{
            /* 
                Calls resetPassword with username to initiate password reset.
                If successful, sets isCodeSent to true to move to stage 2.
            */
            const output = await resetPassword({username: username}); 
            console.log(output);
            if(output.nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'){
                setIsCodeSent(true);
            }
        }
        catch (e){
            console.log(e);
        }
    }
    else{
        try{
            /* 
                Calls confirmResetPassword with username, verification code, 
                and new password to reset the password.
            */
            const rslt = confirmResetPassword({
                username: username, 
                confirmationCode: verificationCode, 
                newPassword: newPassword
            });
            /*redirect based of group of user for now just go to student */
            window.location.href = '/student'; 
        }
        catch(e){
            console.log(e);
        }
    }
  };

  return (
    <>
      <body className='portal-body'>
        <div>
          <img className='portal-bkgd-image' src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className='portal-body-container'>
          <div className='portal-container'>
            <div className='portal-component-container'>
              <h1>Forgot Password</h1>
              <form onSubmit={handleSubmit} className='portal-component-container-form'>
                <input
                  type='text'
                  id="username-input"
                  placeholder='Email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled = {isCodeSent}
                />
                    {isCodeSent && (
                    <>
                    <div className="password-input-container">
                        <input
                            type='text'
                            id="verification-code-input"
                            placeholder='Verification Code'
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="new-password-input"
                            placeholder='New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                </div>
                    </>
                    )}
                {isFocused && (                
                <ul>
                    <li> Be at least 8 characters</li>
                    <li> At least one capital letter </li>
                    <li> At least one number </li>
                    <li> At least one special character</li>
                </ul>
                )}
                <button type="submit">Submit</button>
                <div
                    className="portal-forgot-password"
                    onClick={handleSubmit}
                >
                    Resend Code
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};