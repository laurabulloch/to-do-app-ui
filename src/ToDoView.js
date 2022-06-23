
import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField} from "@mui/material";
import {useState} from "react";

export default function ToDoView() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [toDos, setToDos] = useState([]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = () => {
        const current = toDos.concat({name});
        setToDos(current);
        handleClose()
    };

    return (
        <div>
            <List>
                {toDos.map((item) =>
                    (<ListItem> {(item.name)} </ListItem>)) }
            </List>

            <Button onClick={handleClickOpen}>
                +Add To Do
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New To Do</DialogTitle>
                <DialogContent>
                    <TextField
                        id="to-do-name"
                        label="Enter To Do task here"
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