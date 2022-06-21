import { render, screen } from '@testing-library/react';
import ToDoView from './ToDoView';

describe('To Do View', () => {
    it('should have a button', () => {
        expect(screen.getByLabelText('button')).toBeInTheDocument()
    })
});