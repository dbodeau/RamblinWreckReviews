/*
    Basic Landing Page, includes overview of the website
*/

import minesbkgd from '../../assets/images/mines-bkgd.jpg';
import '../../css/About.css';

export default function About() {
  return (
    <body>
        <div>
            <img className='about-bkgd-image' src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className='about-body-container'>
            <div className='about-container'>
                <div className='about-component-container'>
                    {/*Don't we just love pure html in React*/}
                    <h2>Overview</h2>
                    <p>Mines currently uses CATME, Purdue University’s team evaluation platform, but it has significant costs and lacks crucial features. We are developing an in-house peer evaluation platform that addresses these limitations and incorporates additional functionalities.</p>

                    <h2>Development History</h2>
                    <p>We are the 7th team working on this project. Previous groups have gotten this project 
                        off the ground and deployed on AWS services, yet the site lacks a majority of the 
                        funcitonality and interactions with users. Our goal is to implement
                        as much of the needed functionality with our time on this project throughout Fall '24.
                    </p>

                    <h2>Features</h2>
                    <p><strong>Administrators</strong> or Department heads will curate a catalog of pre-approved questions, define weightings to multiple choice questions and assign mandatory questions.</p>
                    <p><strong>Professors</strong> create and assign surveys, view an up-to-date completion status on surveys and their results, and modify students and TAs on a per-class basis.</p>
                    <p><strong>Students</strong> fill out peer evaluation surveys and review feedback.</p>

                    <h2>Contributors</h2>
                    <div>
                        <div>
                            <h4>Wramblin' Wreck Reviews</h4>
                            <div>Rachel Castro</div>
                            <div>Jenelle Gilliland</div>
                            <div>Andrew Nicola</div>
                            <div>Monique Streetman</div>
                        </div>
                        <div>
                            <h4>6th Time's The Charm</h4>
                            <div>Callen Nash</div>
                            <div>Henry Johnson</div>
                            <div>Nicholas Elliott</div>
                            <div>Wesley Woo</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
  );
};