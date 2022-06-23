import { render, screen } from '@testing-library/react';
import ToDoView from './ToDoView';
import userEvent from "@testing-library/user-event";

const addButton = () => screen.getByRole('button');
const dialogBox = () => screen.getByLabelText('Add New To Do');
const saveButton = () => screen.getByText('Add To Do');
const cancelButton = () => screen.getByText('Cancel');
const inputBox = () => screen.getByLabelText('Enter To Do task here');

describe('To Do View', () => {
    it('should have a button', () => {
        render(<ToDoView />)

        expect(addButton()).toBeInTheDocument()
    })

    it('should display a pop up', () => {
        render(<ToDoView />)

        userEvent.click(addButton());

        expect(dialogBox()).toBeInTheDocument()
    })

    it('should have add button on dialog box', () => {
        render(<ToDoView />)

        userEvent.click(addButton());

        expect(saveButton()).toBeInTheDocument();
    })

    it('should have cancel button on dialog box', () => {
        render(<ToDoView />)

        userEvent.click(addButton());

        expect(cancelButton()).toBeInTheDocument();
    })

    it('should have input box on dialog', () => {
        render(<ToDoView />)

        userEvent.click(addButton());

        expect(inputBox()).toBeInTheDocument();
    })

    it('should close dialog on cancel', () => {
        render(<ToDoView />)

        userEvent.click(addButton());
        userEvent.click(cancelButton());

        expect(screen.queryByText('Enter To Do Task here')).not.toBeInTheDocument();
    })

    it('should contain a list', () => {
        render(<ToDoView />)

        expect(screen.getByRole('list')).toBeInTheDocument();
    })

    it('should add to list on user input', () => {
        render(<ToDoView />)

        userEvent.click(addButton());
        userEvent.type(inputBox(), 'Item');
        userEvent.click(saveButton());

        expect(screen.getByText('Item')).toBeInTheDocument();
    })


});