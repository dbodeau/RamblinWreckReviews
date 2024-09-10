import MenuBar from '../../MenuBar';
import '../../../css/Admin_Home.css';


export default function Admin_Home() {
  return (
    <div>
      <>
      <link rel="stylesheet" href="style.css" />
      <div>
        <div className='admin-home-content-container'>
          {<MenuBar />}
          <div className="admin-home-welcomeText"><h1>Welcome to the admin home page</h1></div>
        </div>
      </div>
      </>
    </div>
  );
}