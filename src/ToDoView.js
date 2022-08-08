import {
  Button,
  Dialog,
  DialogActions,
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
import EditIcon from '@mui/icons-material/Edit';
import ToDoViewService from './ToDoViewService';

export default function ToDoView() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [name, setName] = useState('');
  const [editName, setEditName] = useState('');
  const [toDos, setToDos] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [editErrorMessage, setEditErrorMessage] = useState('');

  useEffect(() => {
    ToDoViewService.getAll().then((response) => {
      setToDos(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEdit = (itemToEdit) => {
    setEditName(itemToEdit.name);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setErrorMessage('');
    setName('');
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditErrorMessage('');
    setEditName('');
    setOpenEdit(false);
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
            <IconButton aria-label="edit" onClick={() => handleClickOpenEdit(item)}>
              <EditIcon />
            </IconButton>
            <Dialog open={openEdit} onClose={handleEditClose}>
              <DialogContent>
                <TextField
                  label="Edit To Do Here"
                  helperText={editErrorMessage}
                  value={editName}
                  onChange={(event) => setName(event.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button>Cancel Edit</Button>
                <Button>Save To Do</Button>
              </DialogActions>
            </Dialog>
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddItem}>Add To Do</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
