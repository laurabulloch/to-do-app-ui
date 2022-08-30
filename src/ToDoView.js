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
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [name, setName] = useState('');
  const [editName, setEditName] = useState('');
  const [toDos, setToDos] = useState();
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [currentToDo, setCurrentToDo] = useState({ id: 1, name: 'Item 1' });

  useEffect(() => {
    ToDoViewService.getAll().then((response) => {
      setToDos(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleClickOpenEdit = (itemToEdit) => {
    setCurrentToDo(itemToEdit);
    setEditName(itemToEdit.name);
    setOpenEdit(true);
  };

  const handleAddClose = () => {
    setAddErrorMessage('');
    setName('');
    setOpenAdd(false);
  };

  const handleEditClose = () => {
    setEditErrorMessage('');
    setEditName('');
    setOpenEdit(false);
  };

  const handleInputError = () => {
    setName('');
    setAddErrorMessage('Invalid Input');
  };

  const handleAddItem = () => {
    if (name.length === 0 || name.length > 100) {
      handleInputError();
    } else {
      ToDoViewService.post(name).then((response) => {
        const updatedToDos = [...toDos, response.data];
        setToDos(updatedToDos);
      });
      handleAddClose();
    }
  };

  const handleEditItem = () => {
    currentToDo.name = editName;
    ToDoViewService.editItem(currentToDo).then(() => {
      toDos[toDos.findIndex((toDo) => toDo.id === currentToDo.id)].name = currentToDo.name;
    });
    handleEditClose();
  };

  const handleClickDelete = (idToDelete) => {
    ToDoViewService.deleteItem(idToDelete).then(() => {
      const updatedToDos = toDos.filter((remove) => {
        return remove.id !== idToDelete;
      });
      setToDos(updatedToDos);
    });
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
            <IconButton aria-label="delete" onClick={() => handleClickDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}{' '}
      </List>
      <Button onClick={handleClickOpen}>+ Add To Do</Button>

      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Add New To Do</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter To Do Here"
            helperText={addErrorMessage}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddItem}>Add To Do</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit To Do Here"
            helperText={editErrorMessage}
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel Edit </Button>
          <Button onClick={handleEditItem}>Save To Do</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
