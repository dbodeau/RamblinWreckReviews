import React from 'react';
import errorImage from './images/404.jpg'; // Assuming 404.png is in the same directory
import './css/Error404.css';

const NotFound = () => {
    return (
      <div className="error-404-not-found">
        <div className="error-404-not-found-content">  {/* Wrap content in a new div */}
          <h1>Uh oh! Blasters not feeling well. <br></br> We can't find the page you're looking for.</h1>
          <div><img className = "error-404-error-image"src={errorImage} alt="404 Page Not Found" /></div>
          <p>
            404 Error: This page may have been removed or the URL might be incorrect. 
          </p>
        </div>
      </div>
    );
  };
  

export default NotFound;