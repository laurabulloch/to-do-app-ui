
import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ToDoView() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        axios.get(`/to-dos`).then(response => {
            setToDos(response.data);
        })
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = () => {
        axios
            .post(`/to-dos`, {
                name,
            })
            .then((response) => {
                const updatedToDos = [...toDos, response.data]
                setToDos(updatedToDos);
            });
        handleClose()
    };


    return (
        <div>
            <List>
                {toDos.map((item) =>
                    (<ListItem> {(item.name)} </ListItem>)) }
            </List>
            <Button onClick={handleClickOpen}>
                + Add To Do
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New To Do</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter To Do here"
                        value = {name}
                        onChange = {(event) => setName(event.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddItem}>Add To Do</Button>
            </Dialog>
        </div>
    )
}