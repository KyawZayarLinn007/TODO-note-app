import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import NoteItem from "./NoteItem";

// dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notes() {
  // add open state
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* new btn */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{ margin: "20px" }}
      >
        <Button
          variant="contained"
          size="large"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          NEW
        </Button>
      </Stack>

      {/* add dialog */}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Add new note</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* notes */}
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <NoteItem Transition={Transition} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <NoteItem Transition={Transition} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <NoteItem Transition={Transition} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <NoteItem Transition={Transition} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
