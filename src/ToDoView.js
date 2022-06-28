
import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField} from "@mui/material";
import {useState} from "react";

export default function ToDoView() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [toDos, setToDos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErrorMessage('');
        setOpen(false);
    };

    const handleInputError = () => {
        setName('');
        setErrorMessage("Invalid Input");
    }

    const handleAddItem = () => {
        if ({name}.name.length === 0 || {name}.name.length > 100){
            handleInputError();
        }
        else
        {
            const current = toDos.concat({name});
            setToDos(current);
            setName("");
            handleClose();
        }
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
                        helperText = {errorMessage}
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