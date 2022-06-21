import { render, screen } from '@testing-library/react';
import ToDoView from './ToDoView';

test('renders learn react link', () => {
    render(<ToDoView />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
