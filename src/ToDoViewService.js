import axios from 'axios';

const ToDoViewService = {
  // eslint-disable-next-line no-undef
  API_URL: process.env.REACT_APP_API_URL + '/to-dos',

  getAll() {
    return axios.get(this.API_URL);
  },

  post(data) {
    return axios.post(this.API_URL, { name: data });
  },
  delete(id) {
    return axios.delete(this.API_URL + '/' + id);
  },
};
export default ToDoViewService;
