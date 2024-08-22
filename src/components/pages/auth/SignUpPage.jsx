/* 
  This is the Sign up page. Can be accessed by the Login page and clicking SignUp. When a user signs up they are added to the coginto pool
  and required to make a password.
*/

import minesbkgd from '../../../assets/images/mines-bkgd.jpg';
import '../../../css/Portal.css';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signUp, confirmSignUp } from 'aws-amplify/auth';

export default function SignUpPage() {
  const [showNewPassword, setShowNewPassword] = useState(false); /*Show password purpose is to hide and show the password: user clicks a FaEye in the input container (in HTML code below)*/
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isFocused, setIsFocused] = useState(false); /*This displays password requirments when the user is in the password input container */
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  
  async function SignUpUser(){
    if (password === rePassword){
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
        }
      });
      setIsSignedUp(true);
    }
    else{
      setErrorMessage('Passwords must match');
    }
  }

  async function confirmUserSignUp(){
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: confirmationCode
    });

    if (isSignUpComplete){
      window.location.href = '/login';
    }
  }

  return (
    <>
      <body className='portal-body'>
        <div>
          <img className="portal-bkgd-image" src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className="portal-body-container">
          <div className="portal-container">
            <div className="portal-component-container">
              <h1>{!isSignedUp ? 'Sign Up' : 'Confirm Email'}</h1>
              {!isSignedUp && (
                <form onSubmit={(e) => {e.preventDefault(); SignUpUser()}} className='portal-component-container-form'>
                  <input
                    type='text'
                    id="email-input"
                    placeholder='Associated Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="password-input-container">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="password-input"
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                      <span className="password-toggle-icon" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                  </div>
                    <div className="password-input-container">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="new-password-input"
                        placeholder='New Password'
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      <span className="password-toggle-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                  </div>
                  {isFocused && (                
                  <ul>
                      <li> Be at least 8 characters</li>
                      <li> At least one capital letter </li>
                      <li> At least one number </li>
                      <li> At least one special character</li>
                      <li> Passwords must match</li>
                  </ul>
                  )}
                  <button type='submit'>Sign Up</button>
                </form>
              )}
              {isSignedUp && (
                  <form onSubmit={(e) => {e.preventDefault(); confirmUserSignUp()}} className='portal-component-container-form'>
                  <input style={{textAlign: "center"}}
                    type='text'
                    id="email-input"
                    placeholder='Confirmation Code'
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                  <button type='submit'>Confirm Email</button>
                </form>
              )}
            </div>
            <p className="error-message">
              {errorMessage}
            </p>
          </div>
        </div>
      </body>
    </>
  );
}
