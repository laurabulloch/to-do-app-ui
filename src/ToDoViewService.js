import axios from 'axios';

export class ToDoViewService {
  constructor() {
    // eslint-disable-next-line no-undef
    this.API_URL = process.env.REACT_APP_API_URL + '/to-dos';
  }

  async getAll() {
    const response = await axios.get(this.API_URL);
    return response.data;
  }
}
