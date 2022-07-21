import ToDoView from './ToDoView';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import axios from 'axios';

const addButton = () => screen.getByRole('button', { name: '+ Add To Do' });
const saveButton = () => screen.getByRole('button', { name: 'Add To Do' });
const cancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const toDoTextField = () => screen.getByLabelText('Enter To Do here');
const mainToDoList = () => screen.getByRole('list');

jest.mock('axios');

describe('To Do View', () => {
  beforeEach(async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    axios.get.mockResolvedValue({ data: toDos });
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
  it('should load ToDos', () => {
    expect(axios.get).toHaveBeenCalledWith('/to-dos');
  });
  it('should display ToDos', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should display ToDos', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should display main to do list', () => {
    expect(mainToDoList()).toBeInTheDocument();
  });
  it('should display delete button on each list item', () => {
    const items = within(mainToDoList()).getAllByRole('button');
    expect(items.length).toBe(2);
  });
  it('should send delete request when delete button pressed', () => {
    axios.delete.mockImplementation(() => new Promise(jest.fn()));

    userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button'));

    expect(axios.delete).toHaveBeenCalledWith('/to-dos/1');
  });
  it('should remove item when delete button pressed', async () => {
    axios.delete.mockResolvedValue({});

    await act(async () => {
      userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button'));
    });

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
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
      axios.post.mockImplementation(() => new Promise(jest.fn()));

      userEvent.type(toDoTextField(), 'Item');
      userEvent.click(saveButton());

      expect(axios.post).toHaveBeenCalledWith('/to-dos', { name: 'Item' });
    });
    it('should add to list on user input', async () => {
      axios.post.mockResolvedValue({
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
