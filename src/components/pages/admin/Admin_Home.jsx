import MenuBar from '../../MenuBar';
import '../../../css/Admin_Home.css';
import NavCard from '../../NavCard';
import person3 from '../../../assets/images/person-3-black.png';
import edit from '../../../assets/images/edit-black.png';
import scale from '../../../assets/images/scale-black.png'; 
import plus from '../../../assets/images/plus-black.png'; 

export default function Admin_Home() {
  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <div>
        <div className='admin-home-content-container'>
          {<MenuBar />}
          {/*How do we feel about this formatting?*/}
          <NavCard 
            route="/admin/create-survey-questions" 
            title="Manage Questions"
            description="Add, edit, or delete questions"
            logo={edit}
          />
          <NavCard 
            route="/admin/manage-faculty" 
            title="Manage Faculty"
            description="Manage department faculty"
            logo={person3}
          />
          <NavCard 
            route="/admin/edit-question-weights" 
            title="Edit Question Weights"
            description="Modify multiple choice grade breakpoints"
            logo={scale}
          />
          {/*NOTE: this page is NOT made yet, so it just keeps the same page*/}
          <NavCard 
            route="/admin" /*"/admin/create-department" */
            title="Create Department"
            description="Initialize a department and assign an administrator"
            logo={plus}
          />
        </div>
      </div>
    </div>
  );
}