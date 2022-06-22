
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";

export default function ToDoView() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return ( <div>
        <Button onClick={handleClickOpen}>
             +Add To Do
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New To Do</DialogTitle>
            <DialogContent>
                <TextField
                    id="to-do-name"
                    label="Enter To Do task here"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Add To Do</Button>
        </Dialog>
    </div>
    )
}