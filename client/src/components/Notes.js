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
import axios from "axios";

// dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notes({user}) {
  let [notes, setNotes] = React.useState([]);
  console.log(`The user props info is ${user}`);
  let userId = user?.id;

  let titleRef = React.useRef();
  let bodyRef = React.useRef();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/notes/userId/${userId}`)
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
  }, []);

  // add open state
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    let title = titleRef?.current?.value;
    let body = bodyRef?.current?.value;

    axios
    .post(`${process.env.REACT_APP_SERVER_URI}/notes/userId/${userId}`, {title, body})
    .then((response) => {
      console.log(`The response is`);
      console.log(response);
      if (!response.error) {
        setNotes(response.data.data);
        setOpen(false);
      } else {
        throw new Error(response.error);
      }
    })
    .catch((error) => {
      console.log(error);
      setOpen(false);
    });
  }

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
          {/* title field */}
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            inputRef={titleRef}
          />
          {/* body field */}
          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            inputRef={bodyRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* notes */}
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid container spacing={4}>
          {
            notes.map(note => {
              return (
                <Grid key={note._id} item xs={12} md={4} lg={3}>
                  <NoteItem Transition={Transition} title={note.title} body={note.body} />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </>
  );
}
