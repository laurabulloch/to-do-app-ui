import RestClient from './RestClient';

const getAll = () => {
  return RestClient.get('/to-dos');
};
const post = (data) => {
  return RestClient.post('/to-dos', { name: data });
};
const deleteItem = (id) => {
  return RestClient.delete('/to-dos/' + id);
};
const editItem = (data) => {
  return RestClient.patch('/to-dos/', { name: data });
};

export default {
  getAll,
  deleteItem,
  post,
  editItem,
};
