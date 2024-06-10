/* This is previous team code and our team did not touch this file. Unknown purpose*/

import csciBkgdImg from './images/csci-bkgd-img.jpeg';
import ellipsis from './images/ellipsis.png';
import './css/SurveyCard.css';

export default function SurveyCard() {
      return (
          <>
            <div className='responsive'>
                <div className="gallery">
                    <div className='professor-home-survey-card-container'>
                        <img className='professor-home-survey-card-container-bkgd-image' src={csciBkgdImg}></img>
                        <div className='professor-home-survey-card-header-container'>
                            <div className='professor-home-survey-card-header-container-title-container'>
                                <h3>Peer Evaluation 1</h3>
                                <h4>CSCI 370</h4>
                            </div>
                            <div className='professor-home-survey-card-status-container'>
                                <p>Unavailable</p>
                            </div>
                            <div>
                            <div className='professor-home-survey-card-dropdown-sub-container'>
                                <button className="professor-home-survey-card-dropdown-button"><img src={ellipsis}/></button>
                                <div className="professor-home-survey-card-dropdown-content" id='professor-home-survey-card-options-content'>
                                    <button className='professor-home-survey-card-dropdown-content-top-button'>Edit</button>
                                    <button>View Results</button>
                                    <button className='professor-home-survey-card-dropdown-content-lower-button'>Send Email Reminder</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='professor-home-survey-card-footer-container'>
                        <h4>May 28, 2024 - May 30, 2024</h4>
                        <div className='professor-home-survey-card-progress-indicator-container'>
                            <div className="professor-home-survey-card-progress-indicator-bar" id='professor-home-survey-card-progress-indicator-bar-id'>
                                <div className="professor-home-survey-card-progress-indicator-bar-inside" id='professor-home-survey-card-progress-indicator-bar-inside-id'><p>64%</p></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
  }