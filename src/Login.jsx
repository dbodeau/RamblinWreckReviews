import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { useState, useEffect } from 'react';
import { signIn } from '@aws-amplify/auth';

Amplify.configure(awsconfig)

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn({
        username,
        password,
      });

      console.log(user);

      if (user.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'){
        window.location.href = '/signup';
      }
      else{
        //Go to correct logged in user page
      }
    } catch (error) {
      // handle sign-in error
      console.error('Sign-in error:', error);
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
              <h1>Login</h1>
              <form onSubmit={handleSubmit} className='portal-component-container-form'>
                <input
                  type='text'
                  id="username-input"
                  placeholder='Email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  // type='password'
                  id="password-input"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
              <div
                className="portal-forgot-password"
                onClick={() => window.location.href = '/signup'}
              >
                Forgot Password
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};