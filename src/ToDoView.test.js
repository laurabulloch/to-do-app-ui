import ToDoView from './ToDoView';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ToDoViewService from './ToDoViewService';

const addButton = () => screen.getByRole('button', { name: '+ Add To Do' });
const saveButton = () => screen.getByRole('button', { name: 'Add To Do' });
const cancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const toDoTextField = () => screen.getByLabelText('Enter To Do here');
const mainToDoList = () => screen.getByRole('list');

jest.mock('./ToDoViewService');

describe('To Do View', () => {
  beforeEach(async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    ToDoViewService.getAll.mockResolvedValue({ data: toDos });
    await act(async () => {
      render(<ToDoView />);
    });
  });
  it('should have a button', () => {
    expect(addButton()).toBeInTheDocument();
  });
  it('should contain a list', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('should display ToDos', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should display delete button on each list item', () => {
    const items = within(mainToDoList()).getAllByRole('button', { name: 'delete' });
    expect(items.length).toBe(2);
  });
  it('should send delete request when delete button pressed', () => {
    ToDoViewService.deleteItem.mockImplementation(() => new Promise(jest.fn()));

    userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'delete' }));

    expect(ToDoViewService.deleteItem).toHaveBeenCalledWith(1);
  });
  it('should remove item when delete button pressed', async () => {
    ToDoViewService.deleteItem.mockResolvedValue({});

    await act(async () => {
      userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'delete' }));
    });

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
  it('should display edit button on each list item', () => {
    const items = within(mainToDoList()).getAllByRole('button', { name: 'edit' });
    expect(items.length).toBe(2);
  });
  it('should open dialog box when edit button pressed', () => {
    userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'edit' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  describe('add', () => {
    beforeEach(() => {
      userEvent.click(addButton());
    });
    it('should display a pop up', () => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    it('should have save button on dialog box', () => {
      expect(saveButton()).toBeInTheDocument();
    });
    it('should have cancel button on dialog box', () => {
      expect(cancelButton()).toBeInTheDocument();
    });
    it('should have input box on dialog', () => {
      expect(toDoTextField()).toBeInTheDocument();
    });
    it('should close dialog on cancel', (done) => {
      userEvent.click(cancelButton());

      waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
        expect(screen.queryByLabelText('Add New To Do')).not.toBeInTheDocument();
        done();
      });
    });
    it('should post on save', () => {
      ToDoViewService.post.mockImplementation(() => new Promise(jest.fn()));

      userEvent.type(toDoTextField(), 'Item');
      userEvent.click(saveButton());

      expect(ToDoViewService.post).toHaveBeenCalledWith({ name: 'Item' });
    });
    it('should add to list on user input', async () => {
      ToDoViewService.post.mockResolvedValue({
        data: {
          id: 3,
          name: 'Item 3',
        },
      });

      userEvent.type(toDoTextField(), 'Item 3');

      await act(async () => {
        userEvent.click(saveButton());
      });

      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
    it('should be invalid input if input empty on save', () => {
      userEvent.click(saveButton());

      expect(screen.getByText('Invalid Input')).toBeInTheDocument();
    });
    it('should be invalid input if length >100', () => {
      userEvent.type(toDoTextField(), 'a'.repeat(101));
      userEvent.click(saveButton());

      expect(screen.getByText('Invalid Input')).toBeInTheDocument();
    });
  });
});
