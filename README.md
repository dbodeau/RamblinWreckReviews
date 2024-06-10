# Ramblin Wreck Reviews
A peer review website for students and teachers designed as competition for CATME.
https://ramblinwreckreviews.com

## Project Description

This project is hosted on AWS, with the frontend on AWS Amplify and the majority of the backend on AWS Lambda. Front-end code is written in React with Node.js, backend code is written in Python (Some are Node.js). The Node.js Lambda’s are automatically generated, which are not recommended to delete. Create a new Lambda in Python, which has cleaner code. It is not recommended to change the system architecture, language or layout as a lot of thought has been put into the design.

For the frontend, there are three groups: admin, professor, and student. Each group would have their own set of associated pages, with the naming convention of Group_NameOfPage (ex: Student_TakeSurvey). Portal pages are for login/signup, while wrapper pages affect all web pages. 

For the css classes, the naming convention is: name-of-page-name-of-class (ex: .student-take-survey-entire-page). If two classes have the same name, they will collide, even if they were in unrelated files. This means that all classes must have the file name in them, so that the classes don’t collide.

In the GitHub repo, there are several folders that were automatically generated when creating the new AWS Amplify project. In the root directory, there is a folder called “amplify”, which holds the settings information for Amplify, as well as AWS React components. Under src, there are two files called “amplifyconfiguration.json” and “aws-exports.js”. These files hold configuration settings, and if not properly configured, deployment will not work. Other automatically generated files include: “public” in root, “assets” in src.

## System Architecture
Our system is built around AWS micro services. The following is an image of the architecture of the project:


AWS Amplify: holds the frontend display and redirects
API Gateway: holds apis to access backend from the frontend
AWS Lambda: backend hub and functionality(in python and js) Holds all backend code
Amazon RDS: SQL database
Amazon Cognito: holds users/passwords and manages authentication
Amazon SES: sends emails, can be done through lambda, look at upload-student-csv lambda function to see how to send emails
Amazon S3: holds files in the cloud, used for file upload
IAM roles: security so that only certain things can access the other aws services

## Web Page Layout

We made some particular design decisions with the clients desires directly in mind. She wanted to have a menu bar type of layout like canvas has so that she would not have to click a bunch of back buttons. They also wanted the website to be the least messy that it could be so we designed things to all be in divs so that the website would appear “modular”. Because of this we have split things up into many different pages with dropdowns and expandable tabs.
One particularly important thing that needs to stay consistent through the website is the coloring and fonts need to follow Mines standards. This can be found at brand.mines.edu

## List of Pages
Admin_CreateSurveQuestions: page link:/admin/create-survey-questions done by the previous group, could use some makeup. Responsible for admins creating questions
Admin_EditQuestionWeights: I'm so sorry for the naming convention, this was done by the previous group, could use some makeup. Page link: admin/edit-question-weights. 
 Admin_Home: right now it has nothing, should show admins their classes and departments. Page link: /admin
Admin_ManageFaculty: adds teachers to courses. Made by the last group, needs makeup. Page link: /admin/manage-faculty
Error401: wrong permissions page. Page link: /401-not-permitted
Error404: page not found page. Page link: /404-not-found
Login: login page, functional from localhost and domain. Page link: /login
Signup: signup page, functional from localhost and domain. Page link: /signup
MenuBar: the bar that appears on the top of all pages. Page link: /
Professor_CreateCourse: made by the last group, literally nothing, would recommend deleting, but ask Donna first.
Professor_EmailNotifications: made by the last group, also nothing. Would be used for sending “nag” emails. Page link: /professor/email-notifications
Professor_Home: shows professors their active surveys and their completion. Page link: /professor
Professor_ManageStudents: add/edit students. Click the plus button to upload csv and add students. Page link: professor/manage-students
Professor/manage-survey: made by the last group, could use some makeup. This is where professors can make surveys. Page link: /professor/manage-survey
Professor_StudentResponses: this is where professors can see the student groups and their responses. Page link: /professor/student-responses
Student_Home: shows students their surveys and classes. Page link: /student
Student_TakeSurvey: students can take surveys. Page link: /student/take-survey
Student_viewFeedback: students can see the feedback they got. Page link: /student/view-feedback

## Installation Guide

Use a text editor that can handle multiple file types, such as VS Code. Start by installing the Node.js (Google their website) and React. Use commands such as git clone to get the repository.

## How to Run Locally

Use the command: npm run dev. Click the link that pops up. If you get an error, you likely need to install the correct dependencies. Use the command: npm install and type in what you want to install.

## How to Deploy Online

Currently, Amplify is set up so that the website is automatically deployed when you push to GitHub. You can edit this in the settings, but that would mean you have to manually build and upload the files individually. If you take this route, make sure you have the correct build script in “package.json” and run a command like: npm run build. Make sure you zip up the contents of the build folder, not the entire build folder. Upload to Amplify.

## How to Access the Database (RDS)

Our team chose an SQL database over an NoSQL database since the data being used You can see the settings for the RDS database inside the AWS console. However, you can’t modify data or tables inside the AWS console. To do this, go to the mySQL website and download SQL. The installation process should take awhile. Once you are done, a program called pgAdmin should be downloaded, along with SQL. Open the application to connect to the database. Below are the credentials to connect: 
The password is: “Password1$”

If you want to edit the information, you can right click on the tables tab and click the PSQL tools. Here you can type in your SQL commands. All connection details can be found in the RDS console. Username: “CSMadmin” Password: “Password1$”

## Troubleshooting Guide

Our team has encountered countless errors when building this website. It is very likely that future teams would also encounter the same errors. Here is a list of error our team has encountered and how to fix them:
MOST COMMON ERROR (stinky build file): Running on localhost works but deployment to Amplify doesn’t work (or nothing works). Solution: you have a stinky build file. Your auto generated settings files for Amplify are wrong, go back to the GitHub and get the correct files (these files will usually be in the .git ignore). Another Solution: you could have a duplicate node_modules folder, which Node.js uses. Make sure that the node_modules folder has the correct content, or regenerate it.
Deployment to Amplify works, but the webpage shows up as a blank, white screen. Solution: go to the Amplify console and click on redirects. You are redirecting to the wrong url link. It needs to redirect from /<*> to /index.html on a 400 redirect.
You get a permissions error in AWS. Solution: for AWS, everything is restricted by default. You need to add new permissions for the action you want. Each service is different, but usually you need to create a new Iam Role and add admin access.
COORS error; happens when you try to set up an API and modify information: Solution: When signing in, an access token will be passed to the user. There is a function to get the access token in the AWS documentation. Make sure that you are passing in the correct credentials for the header.

## Contact

GitHub: htjohnson@mines.edu 
AWS access: striker@mines.edu 
General: nicholas_elliott@mines.edu 
wwoo@mines.edu 
cnash@mines.edu 

Link to Google Doc: https://docs.google.com/document/d/1GOd6QeUZDu_JnHoVzFDENkFdHp7S0dcUVLQJiK3RFIs/edit?usp=sharing 


## Note to Future Teams

As stated, it would not be recommended to modify the structure of the AWS backend, as well as modifying permissions. The skeleton of the project has been created and outlined. Be careful changing the frontend, such as the navigation and element bars. Please just add, don’t change/delete. There are a lot of files that if they were to be changed, would break the code. Be careful when deleting/renaming files that you are unsure of their role.

Even though there were numerous other teams before our team, none of the previous team’s code was used in this project. The current GitHub won’t show any previous team’s code, if you wish to see the previous team’s code use this link: https://github.com/dbodeau/CSCI370-Bodeau-Fall23 (ask Donna Bodeau for permission). Files such as Questions, Survey Card, Survey Questions, Update Questions were not created by our team. They don’t really do anything, and our team recommends deleting them.

The biggest trouble you are likely going to run into is connecting the backend to the frontend. I would recommend looking at API Gateway and its associated Lambda function in order to get an example of how to pass information to the backend. If you get the dreaded COORs error, then you need to make sure that you are passing in the correct credentials into the header of the API call. This would include the sign in token generated when you login.

When in doubt, the password is “Password1$”
