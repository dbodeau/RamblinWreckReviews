import minesbkgd from './images/mines-bkgd.jpg';
import '../../../css/Portal.css';
import { useState } from 'react';
import { confirmSignIn, signIn } from 'aws-amplify/auth';
import { resetPassword } from 'aws-amplify/auth';
import { confirmResetPassword } from 'aws-amplify/auth';

const confirmPendingUser = async (email, tempPassword, newPassword) => {
  // try{
  //   const output = await resetPassword({username: email});
  //   console.log(output);
  // }
  // catch (e){
  //   console.log(e);
  // }

  try {
    const signInRslt = await signIn({
      username: email,
      password: tempPassword,
    });
    console.log('signIn', signInRslt);

    if (signInRslt.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
      const confirmSignInRslt = await confirmSignIn({
        challengeResponse: newPassword,
      });
      console.log('confirmSignIn', confirmSignInRslt);
      window.location.hrefc = '/professor';
    }
  } catch (err) {
    console.error(err);
  }
};

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  return (
    <>
      <body className='portal-body'>
        <div>
          <img className="portal-bkgd-image" src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className="portal-body-container">
          <div className="portal-container">
            <div className="portal-component-container-form">
              <h1>Change Password</h1>
              <form onSubmit={(e) => {e.preventDefault(); confirmPendingUser(email, currentPassword, newPassword)}} className='portal-component-container-form'>
                <input
                  type='text'
                  id="email-input"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  // type='password'
                  id="current-password-input"
                  placeholder='Current Password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  // type='password'
                  id="new-password-input"
                  placeholder='New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type='submit'>Change Password</button>
              </form>
              <div id="error-message" className='portal-error-message-container'> {/* Error message container */} </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
