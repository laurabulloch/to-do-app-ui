import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ToDoViewService from './ToDoViewService';

export default function ToDoView() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [toDos, setToDos] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    ToDoViewService.getAll().then((response) => {
      setToDos(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage('');
    setName('');
    setOpen(false);
  };

  const handleInputError = () => {
    setName('');
    setErrorMessage('Invalid Input');
  };

  const handleAddItem = () => {
    if (name.length === 0 || name.length > 100) {
      handleInputError();
    } else {
      ToDoViewService.post({ name }).then((response) => {
        const updatedToDos = [...toDos, response.data];
        setToDos(updatedToDos);
      });
      handleClose();
    }
  };

  const handleClickDelete = (idToDelete) => {
    ToDoViewService.deleteItem(idToDelete).then(() => {
      const updatedToDos = toDos.filter((remove) => {
        return remove.id !== idToDelete;
      });
      setToDos(updatedToDos);
    });

    handleClose();
  };

  return (
    <div>
      <List>
        {toDos?.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <IconButton aria-label="delete" onClick={() => handleClickDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}{' '}
      </List>
      <Button onClick={handleClickOpen}>+ Add To Do</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New To Do</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter To Do here"
            helperText={errorMessage}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddItem}>Add To Do</Button>
      </Dialog>
    </div>
  );
}
