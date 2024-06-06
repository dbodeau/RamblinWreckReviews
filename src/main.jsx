// admin page imports
import AdminCreateSurveyQuestions from './Admin_CreateSurveyQuestions';
import AdminEditQuestionWeights from './Admin_EditQuestionWeights';
import AdminHome from './Admin_Home';
import AdminManageFaculty from './Admin_ManageFaculty';
// professor page imports
import ProfessorCreateCourse from './Professor_CreateCourse';
import ProfessorEmailNotifications from './Professor_EmailNotifications';
import ProfessorHome from './Professor_Home';
import ProfessorManageStudents from './Professor_ManageStudents';
import ProfessorManageSurvey from './Professor_ManageSurvey';
import ProfessorStudentResponses from './Professor_StudentResponses';
// student page imports
import StudentHome from './Student_Home';
import StudentTakeSurvey from './Student_TakeSurvey';
import StudentViewFeedback from './Student_ViewFeedback';
// login and signup page imports
import Login from './Login';
import SignUp from './SignUp';
// generic imports
// import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Wrapper from './Wrapper';
import NotFound from './Error404';
import NotAuthorized from './Error401'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


//for any web page to be visible in the application, it needs to be linked to this router object
const router = createBrowserRouter([
  {
    //Wrapper (visually known as the navigation bar) is what holds all the different pages of the application
    path: "/",
    element: <Wrapper />,
    children: [
      // for login and signup pages
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      // for admin pages
      {
        path: "/admin/create-survey-questions",
        element: <AdminCreateSurveyQuestions />,
        // same as below
        //loader: getCreateContentPageData
      },
      {
        path: "/admin/edit-question-weights",
        element: <AdminEditQuestionWeights />,
        //loader: fetchAllDepartments
      },
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "/admin/manage-faculty",
        element: <AdminManageFaculty />,
        //loader: fetchAllDepartments
      },
      // for professor pages
      {
        path: "/professor/create-course",
        element: <ProfessorCreateCourse />
      },
      {
        path: "/professor/email-notifications",
        element: <ProfessorEmailNotifications />
      },
      {
        path: "/professor",
        element: <ProfessorHome />
      },
      {
        path: "/professor/manage-students",
        element: <ProfessorManageStudents />
      },
      {
        path: "/professor/manage-survey",
        element: <ProfessorManageSurvey />,
        // probably don't need this
        //loader: getCreateContentPageData
      },
      {
        path: "/professor/student-responses",
        element: <ProfessorStudentResponses />,
      },
      // for student pages
      {
        path: "/student",
        element: <StudentHome />,
      },
      {
        path: "/student/take-survey",
        element: <StudentTakeSurvey />,
      },
      {
        path: "/404-not-found",
        element: <NotFound />,
      },
      {
        path: "/401-not-permitted",
        element: <NotAuthorized />
      },
      {
        path: "/student/view-feedback",
        element: <StudentViewFeedback />,
      }
     ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
//code that renders the application
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>
)
