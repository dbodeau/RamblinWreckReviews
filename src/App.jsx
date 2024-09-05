/*This where all paths go. When you add a page add the path and element below. This is also called index.jsx sometimes*/
// admin page imports
import AdminCreateSurveyQuestions from './components/pages/admin/Admin_CreateSurveyQuestions';
import AdminEditQuestionWeights from './components/pages/admin/Admin_EditQuestionWeights';
import AdminHome from './components/pages/admin/Admin_Home';
import AdminManageFaculty from './components/pages/admin/Admin_ManageFaculty';
// professor page imports
import ProfessorCreateCourse from './components/pages/professor/Professor_CreateCourse';
import ProfessorEmailNotifications from './components/pages/professor/Professor_EmailNotifications';
import ProfessorHome from './components/pages/professor/Professor_Home';
import ProfessorManageStudents from './components/pages/professor/Professor_ManageStudents';
import ProfessorManageSurvey from './components/pages/professor/Professor_ManageSurvey';
import ProfessorStudentResponses from './components/pages/professor/Professor_StudentResponses';
// student page imports
import StudentHome from './components/pages/student/Student_Home';
import StudentTakeSurvey from './components/pages/student/Student_TakeSurvey';
import StudentViewFeedback from './components/pages/student/Student_ViewFeedback';
// login and signup page imports
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import SignUpPage from './components/pages/auth/SignUpPage';
import ForgetPasswordResetPage from './components/pages/auth/ForgetPasswordResetPage';
// generic imports
// import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// import '../../../css/index.css';
import Wrapper from './components/Wrapper';
import NotFound from './components/pages/error/Error404';
import NotAuthorized from './components/pages/error/Error401'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//for any web page to be visible in the application, it needs to be linked to this router object
const router = createBrowserRouter([
  {
    //wrapper (visually known as the navigation bar) is what holds all the different pages of the application
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/Home",
        element: <Home />
      },
      // for login and signup pages
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/forgot-password",
        element:<ForgetPasswordResetPage/>,
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
