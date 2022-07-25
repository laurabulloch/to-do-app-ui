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

export default {
  getAll,
  deleteItem,
  post,
};
