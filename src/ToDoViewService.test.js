import ToDoViewService from './ToDoViewService';
import RestClient from './RestClient';
import { act } from 'react-dom/test-utils';

jest.mock('./RestClient');

describe('To Do View Service', () => {
  it('getAll should return response', () => {
    ToDoViewService.getAll();

    expect(RestClient.get).toBeCalledWith('/to-dos');
  });
  it('post should be called with data', () => {
    ToDoViewService.post('Item 1');

    expect(RestClient.post).toHaveBeenCalledWith('/to-dos', { name: 'Item 1' });
  });
  it('delete should be called', () => {
    ToDoViewService.deleteItem(1);

    expect(RestClient.delete).toHaveBeenCalledWith('/to-dos/1');
  });
  it('delete should be called with data', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    RestClient.get.mockResolvedValue({ data: toDos });

    const response = await act(async () => {
      return ToDoViewService.getAll();
    });

    expect(response).toStrictEqual({ data: toDos });
  });
  it('patch should be called', () => {
    ToDoViewService.editItem('Item 1');

    expect(RestClient.patch).toHaveBeenCalledWith('/to-dos/', { name: 'Item 1' });
  });
});
