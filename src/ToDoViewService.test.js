import { ToDoViewService } from './ToDoViewService';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const toDoViewService = new ToDoViewService();

jest.mock('axios');

describe('To Do View Service', () => {
  it('getAll should return response', () => {
    axios.get.mockResolvedValue('');

    toDoViewService.getAll();

    expect(axios.get).toBeCalledWith('/to-dos');
  });
  it('should load ToDos', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    axios.get.mockResolvedValue(toDos);

    const response = await act(async () => {
      return toDoViewService.getAll();
    });

    expect(response).toStrictEqual(toDos);
  });
  it('post should be called with data', () => {
    axios.post.mockImplementation(() => new Promise(jest.fn()));

    toDoViewService.post('Item 1');

    expect(axios.post).toHaveBeenCalledWith('/to-dos', { name: 'Item 1' });
  });
});
