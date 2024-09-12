import axios from 'axios';

const axiosInstance = axios({
  baseURL: 'https://3l2g4sxaue.execute-api.us-east-2.amazonaws.com/prod',
  headers: {
    'Content-Type': 'application/json',
  },
  // any auth stuff can go here (or get added somewhere below)
})

/**
 * Department: 
 * base url: /department
 * no delete, put as: 
 *    deletion shouldn't really be a thing, could do some sort of setting to inactive if needed
 *    put should be handled by other endpoints with limited responsibilities.
 */

export async function getDepartment(departmentId) {
  // const response = await axiosInstance.get(`/department/{departmentId}`);
  // return response.body;
  return {};
}

export async function createDepartment(department) {
  // const response = await axiosInstance.post('/department', department);
  // return response.body;
  return department;
}

/**
 * Questions:
 * base url: /department/${departmentId}/questions
 * TODO: relies on currUser's admin department. Get from currUser object retrieved from server. 
 *    Should probably ensure currUser has an admin department. TS would ensure we did this.
 */

export async function getQuestions(departmentId) {
  // const response = await axiosInstance.get(`/department/{departmentId}/questions`});
  // return response.body;
  return [];
}

export async function createQuestion(question) {
  // const response = await axiosInstance.post(`/department/{currUser.adminDepartment}/questions/`, question);
  // return response.body;
  return question;
}

export async function updateQuestion(question) {
  // const response = await axiosInstance.put(`/department/{currUser.adminDepartment}/questions/${question.id}`, question);
  // return response.body;
  return question;
}

// Should not actually delete, just set to inactive.
export async function deleteQuestion(questionId) {
  // const response = await axiosInstance.delete(`/department/{currUser.adminDepartment}/questions/${questionId}`);
  // return response.body;
  return true;
}

/**
 * Question weights:
 * base url: /department/${departmentId}/mcqweights 
 * Unsure of needed parameters or properties
 * no get, post, delete because they should not be needed. 
 *    get is covered in get department / get survey
 *    post/delete not needed, one to one with department.
 */

export async function updateQuestioWeights(department, weights) {
  // const response = await axiosInstance.put(`/department/${department.id}/mcqweights`, weights);
  // return response.body;
  return weights;
}

/**
 * Department Faculty: 
 * base url: /department/${departmentId}/faculty
 * no get, covered in department
 *    impliment if ever non-admin should be able to view other faculty in one of their departments
 */

export async function addDepartmentFacultyMember(facultyMember) {
  // const response = await axiosInstance.post(`/department/{currUser.adminDepartment}/faculty/`, facultyMember);
  // return response.body;
  return facultyMember;
}

export async function updateDepartmentFacultyMember(facultyMember) {
  // const response = await axiosInstance.put(`/department/{currUser.adminDepartment}/faculty/${facultyMember.id}`, facultyMember);
  // return response.body;
  return facultyMember;
}

// Should not actually delete, just set to inactive.
export async function deleteDepartmentFacultyMember(facultyMemberId) {
  // const response = await axiosInstance.delete(`/department/{currUser.adminDepartment}/faculty/${facultyMemberId}`);
  // return response.body;
  return true;
}

/**
 * Courses:
 * base url: /courses
 */

export async function getCoursesForStudent() {
  // const response = await axiosInstance.get(`/courses/student`});
  // return response.body;
  return [];
}

export async function getCoursesForProfessor() {
  // const response = await axiosInstance.get(`/courses/professor`});
  // return response.body;
  return [];
}

export async function createCourse(course) {
  // const response = await axiosInstance.post(`/courses/`, course);
  // return response.body;
  return course;
}

export async function updateCourse(course) {
  // const response = await axiosInstance.put(`/courses/${course.id}`, course);
  // return response.body;
  return course;
}

// Should not actually delete, just set to inactive.
export async function deleteCourse(courseId) {
  // const response = await axiosInstance.delete(`/courses/${courseId}`);
  // return response.body;
  return true;
}

/**
 * Course Faculty:
 * base url: /courses/${courseId}/faculty
 * no get, covered in class
 */

export async function addCourseFacultyMember(courseId, facultyMember) {
  // const response = await axiosInstance.post(`/courses/${courseId}/faculty/`, facultyMember);
  // return response.body;
  return facultyMember;
}

export async function updateCourseFacultyMember(courseId, facultyMember) {
  // const response = await axiosInstance.put(`/courses/${courseId}/faculty/${facultyMember.id}`, facultyMember);
  // return response.body;
  return facultyMember;
}

// Should not actually delete, just set to inactive.
export async function deleteCourseFacultyMember(courseId, facultyMemberId) {
  // const response = await axiosInstance.delete(`/courses/${courseId}/faculty/${facultyMemberId}`);
  // return response.body;
  return true;
}

/**
 * Course Students: 
 * base url: /courses/${courseId}/students
 * no get, covered in class
 */

export async function addCourseStudent(courseId, student) {
  // const response = await axiosInstance.post(`/courses/${courseId}/students/`, student);
  // return response.body;
  return student;
}

export async function updateCourseStudent(courseId, student) {
  // const response = await axiosInstance.put(`/courses/${courseId}/students/${student.id}`, student);
  // return response.body;
  return student;
}

// Should not actually delete, just set to inactive.
export async function deleteCourseStudent(courseId, studentId) {
  // const response = await axiosInstance.delete(`/courses/${courseId}/students/${studentId}`);
  // return response.body;
  return true;
}

/**
 * Surveys:
 * base url: /course/${courseId}/surveys
 */

export async function getSurvey(courseId, surveyId) {
  // const response = await axiosInstance.get(`/course/${courseId}/surveys/${surveyId}`});
  // return response.body;
  return {};
}

export async function createSurvey(courseId, survey) {
  // const response = await axiosInstance.post(`/course/${courseId}/surveys`, survey);
  // return response.body;
  return survey;
}

export async function updateSurvey(courseId, survey) {
  // const response = await axiosInstance.put(`/course/${courseId}/surveys/{survey.id}`, survey);
  // return response.body;
  return survey;
}

// Should not actually delete, just set to inactive.
export async function deleteSurvey(courseId, surveyId) {
  // const response = await axiosInstance.delete(`/course/${courseId}/surveys/${surveyId}`);
  // return response.body;
  return true;
}

/**
 * Responses: 
 * base url: /course/${courseId}/surveys/${surveyId}/responses
 * no delete or get
 *    delete unneeded
 *    get covered in survey
 */

export async function createResponse(courseId, surveyId, studentResponse) {
  // const response = await axiosInstance.post(`/course/${courseId}/surveys/${surveyId}/responses`, studentResponse);
  // return response.body;
  return survey;
}

export async function updateResponse(courseId, surveyId, studentResponse) {
  // const response = await axiosInstance.put(`/course/${courseId}/surveys/{surveyId}/responses/${studentResponse.id}`, studentResponse);
  // return response.body;
  return survey;
}

