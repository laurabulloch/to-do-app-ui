import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function ToDoView() {
    const [open, setOpen] = React.useState(false);
    const [toDoName, setToDoName] = React.useState('');
    const [checked, setChecked] = React.useState([0]);
    const [toDos, setToDos] = React.useState([]);
    const [currentID, setCurrentID] = React.useState(0);


    const onInputChange = (event) => {
        const inputValue = event.target.value;

        setToDoName(inputValue);
    }

    const createToDo = () => {
        const newToDo = {
            ID: currentID,
            text: toDoName
        };

        setCurrentID(currentID + 1);
        const newArray = toDos.concat(newToDo);
        setToDos(newArray);
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

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {toDos.map((toDoObj) => {
                    const labelId = `toDo-list-label-${toDoObj.ID}`;

                    return (
                        <ListItem
                            key={toDoObj.ID}
                            secondaryAction={
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(toDoObj)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(toDoObj) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={toDoObj.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
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