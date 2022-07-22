import RestClient from './RestClient';

const ToDoViewService = {
  getAll() {
    return RestClient.get('/to-dos');
  },
  post(data) {
    return RestClient.post('/to-dos', { name: data });
  },
  delete(id) {
    return RestClient.delete('/to-dos/' + id);
  },
};
export default ToDoViewService;
