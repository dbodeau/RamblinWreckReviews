import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';
import { signIn } from 'aws-amplify/auth';

const passwordInput = document.getElementById('password-input').value.trim();
const usernameInput = document.getElementById('username-input').value.trim();

await signIn({
  username: usernameInput,
  password: passwordInput
})

export default function Login(){
  return (
    <>
    <body className='portal-body'>
      <div>
        <img className='portal-bkgd-image' src={minesbkgd} alt="Mines Logo"/>
      </div>
      <div className='portal-body-container'>
        <div className='portal-container'>
          <div className='portal-component-container'>
            <h1>Login</h1>
            <input type='text' id="username-input" placeholder='Username'></input>
            <input type='text' id="password-input" placeholder='Password'></input>
            <button onClick={signIn}>Submit</button>
            <div className="portal-forgot-password" onClick={() => { window.location.href = '/signup';}}>
              Forgot Password
            </div>
          </div>
        </div>
      </div>
    </body>
    </>
  );
};
