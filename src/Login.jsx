import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { signIn } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';

Amplify.configure(awsconfig)

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // This code will run after the initial render
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({
        username,
        password,
      });
      // Handle successful sign-in
      console.log("Success");
    } catch (error) {
      // Handle sign-in error
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
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  id="username-input"
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type='password'
                  id="password-input"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
              <div
                className="portal-forgot-password"
                onClick={() => { window.location.href = '/signup'; }}
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