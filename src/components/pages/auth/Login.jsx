/* 
  This is the login page. This is what the user is first redirected to when they type in our url if they are not signed in. There are 2 cases to this code 
  1.If they click forgot their password they are redirected to ForgetPasswordResetPage
  2.If they know username(being email) and password they are redirected to the page they have the highest permissions too
*/

import minesbkgd from '../../../assets/images/mines-bkgd.jpg';
import '../../../css/Portal.css';
import { useState, useEffect } from 'react';
import { signIn } from '@aws-amplify/auth';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); /*Show password purpose is to hide and show the password: user clicks a FaEye in the input container (in HTML code below)*/
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false); /*This displays password requirments when the user is in the password input container */
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn({ /* This a built in API call imported from aws-amplif/auth*/
        username,
        password,
      });

      /*Case 1 above*/
       window.location.href = '/student'; /* Need to implement based off highest group */
    } 
      catch (error) {
      /* Handling sign in errors: these are printed below forgot password button when error occurs */
      console.log('Sign-in error:', error.message);
      if (error.message == 'Incorrect username or password.') {
          setErrorMessage('Incorrect username or password');
      } 
      else if(error.message == 'Password attempts exceeded'){
        setErrorMessage('Password attempts exceeded');
      }
      else {
        setErrorMessage('An Error Occurred');
      }
    }
  };

  return (
    <>
      <div className='portal-body'>
        <div>
          <img className='portal-bkgd-image' src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className='portal-body-container'>
          <div className='portal-container'>
            <div className='portal-component-container'>
              <h1>Login</h1>
              <form onSubmit={handleSubmit} className='portal-component-container-form'>
              <div className="password-input-container">
                  <input
                    type='text'
                    id="username-input"
                    placeholder='Email'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="new-password-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {isFocused && ( /*Edit here to change password requriment list*/
                <ul>
                    <li> Be at least 8 characters </li>
                    <li> At least one capital letter </li>
                    <li> At least one number </li>
                    <li> At least one special character</li>
                </ul>
                )}
                <button type="submit">Submit</button>
              </form>
              <div
                className="portal-forgot-password"
                onClick={() => window.location.href = '/forgot-password'} /*Case 2 above */
              >
                Forgot Password
              </div>
            </div>
            <p className="error-message">
              {errorMessage}
            </p>

            <a href='/signup'><button className='portal-sign-up-redirect-button'>Don't have an account?<br></br> Sign Up!</button></a>
          </div>
        </div>
      </div>
    </>
  );
};