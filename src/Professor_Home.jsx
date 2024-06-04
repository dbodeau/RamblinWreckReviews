import {Link} from 'react-router-dom';
import './css/Professor_Home.css';
import MenuBar from './MenuBar';
import SurveyCard from './SurveyCard';
import {withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// START EXAMPLE
function Professor_Home() {
  // put your request data here!
  const requestData = {
    base: 3,
    exponent: 6
  };

  // function to call the API
  const callApi = () => {
    fetch('https://i7dp69kljj.execute-api.us-east-2.amazonaws.com/FirstTimeUserPasswordRestAPI-Stage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // use this for your apiKey if you have one
        //'x-api-key': apiKey
        // add any other headers if needed, like authorization headers
      },
      body: JSON.stringify(requestData) // needs to be stringifed or for some reason it didn't work
    }) // displays the output in a new window
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => { // did work
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow.document.write('<html><head><title>API Response</title></head><body>');
      newWindow.document.write('<h1>API Response</h1>');
      newWindow.document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
      newWindow.document.write('</body></html>');
    })
    .catch(error => { // didn't work
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow.document.write('<html><head><title>API Error</title></head><body>');
      newWindow.document.write('<h1>Error</h1>');
      newWindow.document.write('<pre>' + error.message + '</pre>');
      newWindow.document.write('</body></html>');
    });
  };

// END EXAMPLE
    return (
        <>
        <div className='professor-home-body-frame'>
          <div className='professor-home-menu-bar-container'>
            <MenuBar />
          </div>
          <div className='professor-home-content-container'>
            <SurveyCard />
            <SurveyCard />
            <SurveyCard />
            <SurveyCard />
            <SurveyCard />
          </div>
        </div>
        </>
      );
}

export default withAuthenticator(Professor_Home);


/* <div className='professor-home-card'>
            <div id="welcomeText"><h1>Welcome to the professor home page</h1></div>
            <Link to="/professor/create-course">
              <button className='professor-home-button'>Create Course</button>
            </Link>
            <Link to="/professor/email-notifications">
              <button className='professor-home-button'>Email Notifications</button>
            </Link>
            <Link to="/professor/manage-students">
              <button className='professor-home-button'>Manage Students</button>
            </Link>
            <Link to="/professor/manage-survey">
              <button className='professor-home-button'>Manage Surveys</button>
            </Link>
            <Link to="/professor/student-responses">
              <button className='professor-home-button'>Student Responses</button>
            </Link>
            <button id="apiButton" className="professor-home-button" onClick={callApi}>Call API!</button>
          </div>
          
    
          <h3 className='professor-home-list-of-surveys-title'>Current Surveys</h3>
            <div className='professor-home-survey-card'>
              <div className='professor-home-class-card'>
                <h3 className='professor-home-class-name'>Class Code A</h3>
              </div>
              <div className='professor-home-class-card'>
                <h3 className='professor-home-class-name'>Class Code B</h3>
                <div className='professor-home-class-survey-card'>
                </div>
              </div>
            </div>


      
            <h3 className='professor-home-list-of-surveys-title'>Past Surveys</h3>
            <div className='professor-home-survey-card'>
              <div className='professor-home-class-card'>
                <h3 className='professor-home-class-name'>Class Code A</h3>
              </div>
              <div className='professor-home-class-card'>
                <h3 className='professor-home-class-name'>Class Code B</h3>
                <div className='professor-home-class-survey-card'>
                </div>
              </div>
            </div> */