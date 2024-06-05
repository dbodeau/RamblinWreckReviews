import {Link} from 'react-router-dom';
import './css/Professor_Home.css';
import MenuBar from './MenuBar';
import SurveyCard from './SurveyCard';
import {withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';

// START EXAMPLE
export default function Professor_Home() {

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