import '../../../css/Professor_Home.css';
import MenuBar from '../../MenuBar';
import SurveyCard from '../../SurveyCard';

export default function Professor_Home() {
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