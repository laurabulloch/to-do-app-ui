
import {Button, Dialog, DialogTitle} from "@mui/material";
import {useState} from "react";

export default function ToDoView() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return ( <div>
        <Button onClick={handleClickOpen}>
             +Add To Do
        </Button>
        <Dialog open={open} >
            <DialogTitle>Add New To Do</DialogTitle>
            <Button>Cancel</Button>
            <Button>Add To Do</Button>
        </Dialog>
    </div>
    )
}