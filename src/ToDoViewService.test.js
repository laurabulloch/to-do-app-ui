import ToDoViewService from './ToDoViewService';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('To Do View Service', () => {
  it('getAll should return response', () => {
    axios.get.mockResolvedValue('');

    ToDoViewService.getAll();

    expect(axios.get).toBeCalledWith('/to-dos');
  });
  it('should load ToDos', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    axios.get.mockResolvedValue(toDos);

    const response = await act(async () => {
      return ToDoViewService.getAll();
    });

    expect(response).toStrictEqual(toDos);
  });
  it('post should be called with data', () => {
    axios.post.mockImplementation(() => new Promise(jest.fn()));

    ToDoViewService.post('Item 1');

    expect(axios.post).toHaveBeenCalledWith('/to-dos', { name: 'Item 1' });
  });
  it('delete should be called with data', () => {
    axios.post.mockImplementation(() => new Promise(jest.fn()));

    ToDoViewService.delete(1);

    expect(axios.delete).toHaveBeenCalledWith('/to-dos/1');
  });
});
