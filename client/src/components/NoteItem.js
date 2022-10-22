import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const NoteItem = ({ Transition, title, body, id, setNotes, userId }) => {
  //edit open state
  const [eopen, setEOpen] = React.useState(false);

  //editId state
  const [editId, setEditId] = React.useState(null);

  const handleClickEditOpen = (id) => {
    setEOpen(true);
    setEditId(id)
  };

  const handleEditClose = () => {
    setEOpen(false);
  };

  const handleEdit = (id) => {
    //TODO
    // title and body in req.body
    axios.put(`${process.env.REACT_APP_SERVER_URI}/notes/userId/${userId}/noteId/${id}`)
    .then((response) => {
      console.log(`The response is`);
      console.log(response);
      if (!response.error) {
        setNotes(response.data.data);
      } else {
        throw new Error(response.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //delete open state
  const [dopen, setDOpen] = React.useState(false);

  //deleteId state
  const [deleteId, setDeleteId] = React.useState(null);

  const handleClickDeleteOpen = (id) => {
    setDOpen(true);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URI}/notes/userId/${userId}/noteId/${id}`)
    .then((response) => {
      console.log(`The response is`);
      console.log(response);
      if (!response.error) {
        setNotes(response.data.data);
      } else {
        throw new Error(response.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {/* card item */}
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="success"
              onClick={() => { handleClickEditOpen(id) }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={ () => { handleClickDeleteOpen(id) } }
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      {/* edit dialog */}
      <Dialog
        fullWidth={true}
        open={eopen}
        onClose={handleEditClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Edit note</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          {/* set handleEdit(editId) */}
          <Button onClick={handleEditClose} color="success">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog */}
      <Dialog
        fullWidth={true}
        open={dopen}
        onClose={handleDeleteClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete note</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This note will be deleted forever! Are you sure to continue this
            operation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={() => {handleDelete(deleteId)}} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;
