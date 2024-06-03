import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';


export default function Login(){
  const handleAPICall = () => {
    const passwordInput = document.getElementById('password-input').value.trim();
    const usernameInput = document.getElementById('username-input').value.trim();
    const requestData = {
      username: usernameInput,
      password: passwordInput
    };

    fetch('https://8evv8a0tdc.execute-api.us-east-2.amazonaws.com/login-authentication-stage1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed, like authorization headers
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const parsedBody = JSON.parse(data.body);
        
        console.log('Response:', data.body);
        console.log('Response URL:', parsedBody.redirectUrl);
        
        window.location.href = parsedBody.redirectUrl; //redirect you to page returned from Lambda function(login-authentication)
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
      });
  };
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
            <button onClick={handleAPICall}>Submit</button>
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
