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

    it('should have add button on pop up', () => {
        render(<ToDoView />)

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Add to tasks')).toBeInTheDocument();
    })

});