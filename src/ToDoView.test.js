import ToDoView from './ToDoView';
import userEvent from "@testing-library/user-event";
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import axios from "axios";
import {act} from "react-dom/test-utils";

const addButton = () => screen.getByRole('button', '+ Add To Do');
const saveButton = () => screen.getByText('Add To Do');
const cancelButton = () => screen.getByText('Cancel');
const toDoTextField = () => screen.getByLabelText('Enter To Do here');

jest.mock('axios');

describe('To Do View', () => {
    beforeEach( async () => {
        axios.get.mockResolvedValue({data: []})
        await act(async () => {
            render(<ToDoView/>)
        });
    });
    it('should have a button', () => {
        expect(addButton()).toBeInTheDocument()
    })
    it('should display a pop up', () => {
        userEvent.click(addButton());

        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    it('should have save button on dialog box', () => {
        userEvent.click(addButton());

        expect(saveButton()).toBeInTheDocument();
    })
    it('should have cancel button on dialog box', () => {
        userEvent.click(addButton());

        expect(cancelButton()).toBeInTheDocument();
    })
    it('should have input box on dialog', () => {
        userEvent.click(addButton());

        expect(toDoTextField()).toBeInTheDocument();
    })
    it('should close dialog on cancel', (done) => {
        userEvent.click(addButton());

        userEvent.click(cancelButton());

        waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
            expect(screen.queryByLabelText('Add New To Do')).not.toBeInTheDocument();
            done();
        });
    })
    it('should contain a list', () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
    })
    it('should post on save',  () => {
        axios.post.mockImplementation(() => new Promise(jest.fn()));

        userEvent.click(addButton());
        userEvent.type(toDoTextField(), 'Item');
        userEvent.click(saveButton());

        expect(axios.post).toHaveBeenCalledWith('/to-dos', {name: 'Item'});
    })
    it('should add to list on user input', () => {
        axios.post.mockResolvedValue({
            data: {
                id: 1,
                name: 'Item'
            }
        });

        userEvent.click(addButton());
        userEvent.type(toDoTextField(), 'Item');
        userEvent.click(saveButton());

        expect(screen.getByText('Item')).toBeInTheDocument();
    })
    it('should fetch data', () =>{
        expect(axios.get).toHaveBeenCalledWith('/to-dos');
    })
    it('should load data into list and display',  () =>{
        const toDos = [
            {name: 'Item 1'},
            {name: 'Item 2'},
        ];
        axios.get.mockImplementationOnce(() => Promise.resolve({toDos}))

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    })
    it('should post the data', () =>{
        expect(axios.post).toHaveBeenCalledWith('/to-dos');
    })

});
