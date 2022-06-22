import { render, screen } from '@testing-library/react';
import ToDoView from './ToDoView';
import userEvent from "@testing-library/user-event";

describe('To Do View', () => {
    it('should have a button', () => {
        render(<ToDoView />)

        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should display a pop up', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByLabelText('Add New To Do')).toBeInTheDocument()
    })

    it('should have add button on dialog box', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Add To Do')).toBeInTheDocument();
    })

    it('should have cancel button on dialog box', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Cancel')).toBeInTheDocument();
    })

    it('should have input box on dialog', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByLabelText('Enter To Do task here')).toBeInTheDocument();
    })

    it('should close dialog on cancel', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));
        userEvent.click(screen.getByText('Cancel'));


        expect(screen.queryByText('Enter To Do Task here')).not.toBeInTheDocument();
    })

});