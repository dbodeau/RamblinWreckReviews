import './css/Professor_Home.css';
import MenuBar from './MenuBar';
import SurveyCard from './SurveyCard';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import AWS_Authenticator from './AWS_Authenticator';
import AuthStatusEnum from './AuthStatusEnum';

Amplify.configure(awsconfig);

function Professor_Home() {
  return (
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
  );
}

export default AWS_Authenticator(Professor_Home, AuthStatusEnum.SUPERUSER);