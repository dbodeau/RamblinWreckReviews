import MenuBar from '../../MenuBar';
import Error401 from '../error/Error401';
import '../../../css/Admin_Home.css';
import AWS_Authenticator from '../../AWS_Authenticator';
import AuthStatusEnum from '../../../types/AuthStatusEnum';


function Admin_Home() {
  return (
    <div>
      <>
      <link rel="stylesheet" href="style.css" />
      <body>
        <div className='admin-home-content-container'>
          {<MenuBar />}
          <div className="admin-home-welcomeText"><h1>Welcome to the admin home page</h1></div>
        </div>
      </body>
      </>
    </div>
  );
}

export default AWS_Authenticator(Admin_Home, AuthStatusEnum.ADMIN);