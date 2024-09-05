/*
    Basic Landing Page, includes overview of the website
*/

import minesbkgd from '../../assets/images/mines-bkgd.jpg';
import '../../css/Home.css';

export default function Home() {
  return (
    <body>
        <div>
            <img className='home-bkgd-image' src={minesbkgd} alt="Mines Logo" />
        </div>
        <div className='home-body-container'>
            <div className='home-container'>
                <div className='home-component-container'>
                    {/*Don't we just love pure html in React*/}
                    <h2>Overview</h2>
                    <p>Mines currently uses CATME, Purdue University’s team evaluation platform, but it has significant costs and lacks crucial features. We are developing a modern, in-house peer evaluation platform that addresses these limitations and incorporates additional functionalities.</p>

                    <h2>Development History</h2>
                    <p>We are the 7th team working on this project.</p>

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