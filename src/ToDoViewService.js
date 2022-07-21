import axios from 'axios';

export class ToDoViewService {
  constructor() {
    // eslint-disable-next-line no-undef
    this.API_URL = process.env.REACT_APP_API_URL + '/to-dos';
  }
  async getAll() {
    return axios.get(this.API_URL);
  }
}
