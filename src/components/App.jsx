/*This where all paths go. When you add a page add the path and element below.*/
// admin page imports
import AdminCreateSurveyQuestions from './pages/admin/Admin_CreateSurveyQuestions';
import AdminEditQuestionWeights from './pages/admin/Admin_EditQuestionWeights';
import AdminHome from './pages/admin/Admin_Home';
import AdminManageFaculty from './pages/admin/Admin_ManageFaculty';
// professor page imports
import ProfessorCreateCourse from './pages/professor/Professor_CreateCourse';
import ProfessorEmailNotifications from './pages/professor/Professor_EmailNotifications';
import ProfessorHome from './pages/professor/Professor_Home';
import ProfessorManageStudents from './pages/professor/Professor_ManageStudents';
import ProfessorManageSurvey from './pages/professor/Professor_ManageSurvey';
import ProfessorStudentResponses from './pages/professor/Professor_StudentResponses';
// student page imports
import StudentHome from './pages/student/Student_Home';
import StudentTakeSurvey from './pages/student/Student_TakeSurvey';
import StudentViewFeedback from './pages/student/Student_ViewFeedback';
// login and signup page imports
import About from './pages/About';
import Login from './pages/auth/Login';
import SignUpPage from './pages/auth/SignUpPage';
import ForgetPasswordResetPage from './pages/auth/ForgetPasswordResetPage';
// generic imports
import React from 'react';
import '../css/index.css';
import Wrapper from './Wrapper';
import NotFound from './pages/error/Error404';
import NotAuthorized from './pages/error/Error401'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';

// Amplify theme
const theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.shadow.secondary}' },
          },
        }
      },
    },
  },
};

//for any web page to be visible in the application, it needs to be linked to this router object
const router = createBrowserRouter([
  {
    //wrapper (visually known as the navigation bar) is what holds all the different pages of the application
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/About",
        element: <About />
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
        element: <ForgetPasswordResetPage />,
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

export default function App(){
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme} colorMode="light">
        <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
      </ThemeProvider>
    </React.StrictMode>
  )
}