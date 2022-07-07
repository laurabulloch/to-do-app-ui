import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ToDoView() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [toDos, setToDos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    axios.get(process.env.REACT_APP_API_URL + '/to-dos').then((response) => {
      setToDos(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage('');
    setOpen(false);
  };

  const handleInputError = () => {
    setName('');
    setErrorMessage('Invalid Input');
  };

  const handleAddItem = () => {
    if ({ name }.name.length === 0 || { name }.name.length > 100) {
      handleInputError();
    } else {
      axios
        // eslint-disable-next-line no-undef
        .post(process.env.REACT_APP_API_URL + '/to-dos', {
          name,
        })
        .then((response) => {
          const updatedToDos = [...toDos, response.data];
          setToDos(updatedToDos);
        });
      handleClose();
    }
  };

  return (
    <div>
      <List>
        {toDos.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
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
