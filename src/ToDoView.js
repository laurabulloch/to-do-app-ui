import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ToDoView() {
    const [open, setOpen] = React.useState(false);
    const [toDoName, setToDoName] = React.useState('');
    const toDoArray = [];

    const onInputChange = (event) => {
        const inputValue = event.target.value;

        setToDoName(inputValue);
    }

    const createToDo = (text) => {
        if (toDoArray.length == 0){
            const addedToDo ={
                ID:0,
                text:toDoName
            };
            toDoArray[0] = addedToDo;

        }
        else {
            const addedToDo ={
                ID:toDoArray.length,
                text:toDoName
            };
            toDoArray[toDoArray.length -1] = addedToDo;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = () => {
        createToDo();
        handleClose();
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ToDo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type your task here:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="to-do-name"
                        label="Enter ToDo task here"
                        onChange ={onInputChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddItem}>Add Item</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}