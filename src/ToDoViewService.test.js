import ToDoViewService from './ToDoViewService';
import RestClient from './RestClient';

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
  it('delete should be called with data', () => {
    ToDoViewService.delete(1);

    expect(RestClient.delete).toHaveBeenCalledWith('/to-dos/1');
  });
});
