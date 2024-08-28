import axios from 'axios';

const axiosInstance = axios({
  baseURL: 'https://0wr74dgf99.execute-api.us-east-2.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // any auth stuff can go here (or get added somewhere below)
})

/*
 * Questions: 
 * Unsure of needed parameters or question properties
 */

export async function getQuestions(department) {
  // const response = await axiosInstance.get('/questions', {params: {departmet}});
  // return response.body;
  return [];
}

export async function createQuestion(question) {
  // const response = await axiosInstance.post('/questions/', question);
  // return response.body;
  return question;
}

export async function updateQuestion(question) {
  // const response = await axiosInstance.put(`/questions/${question.id}`, question);
  // return response.body;
  return question;
}

// Should not actually delete, just set to inactive.
export async function deleteQuestion(question) {
  // const response = await axiosInstance.delete(`/questions/${question.id}`);
  // return response.body;
  return question;
}

