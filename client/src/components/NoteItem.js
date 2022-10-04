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

const NoteItem = ({ Transition }) => {
  //edit open state
  const [eopen, setEOpen] = React.useState(false);

  const handleClickEditOpen = () => {
    setEOpen(true);
  };

  const handleEditClose = () => {
    setEOpen(false);
  };

  //delete open state
  const [dopen, setDOpen] = React.useState(false);

  const handleClickDeleteOpen = () => {
    setDOpen(true);
  };

  const handleDeleteClose = () => {
    setDOpen(false);
  };

  return (
    <>
      {/* card item */}
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Title
          </Typography>
          <Typography variant="body1">well meaning and kindly.</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="success"
              onClick={handleClickEditOpen}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={handleClickDeleteOpen}
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
          <Button onClick={handleDeleteClose} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;
