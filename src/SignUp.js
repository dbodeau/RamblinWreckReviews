import minesbkgd from './images/mines-bkgd.jpg';
import './css/Portal.css';
// import Login from './Login';

export default function SignUp() {
  const handleAPICall = () => {
    // Gets input from username and password fields
    const usernameInput = document.getElementById('username-input').value.trim();
    const passwordInput = document.getElementById('password-input').value.trim();
    const reEnterPasswordInput = document.getElementById('re-enter-password-input').value.trim();
    const errorMessage = document.getElementById('error-message'); // Reference to error message element
    const requestData = {
      username: usernameInput,
      new_password: reEnterPasswordInput
    };

    errorMessage.textContent = '';

    if (passwordInput === reEnterPasswordInput && (!(usernameInput === ""))) {
      // Successful login logic
      fetch('https://i7dp69kljj.execute-api.us-east-2.amazonaws.com/FirstTimeUserPasswordRestAPI-Stage' ,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'NXglZBtATb435jQ18Gi0l3ID9uWReQsKaDAbTv4F',
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
        
       // window.location.href = parsedBody.redirectUrl; //redirect you to page returned from Lambda function(login-authentication)
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
      });
    } else {
      // Display error message based on the condition
      if (usernameInput === "") {
        errorMessage.textContent = "Username field is empty.";
      } else {
        errorMessage.textContent = "Passwords do not match.";
      }
    }

  };
  return (
    <>
      <body className='portal-body'>
        <div>
          <img className="portal-bkgd-image" src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className="portal-body-container">
          <div className="portal-container">
            <div className="portal-component-container">
              <h1>Change Password</h1>
              <input type="text" id="username-input" placeholder="Username" />
              <input type="password" id="password-input" placeholder="New Password" />
              <input type="password" id="re-enter-password-input" placeholder="Re-enter New Password" />
              <button onClick={handleAPICall}>Change Password</button>
              <div id="error-message" className='portal-error-message-container'> {/* Error message container */} </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
