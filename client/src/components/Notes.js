import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Stack from "@mui/material/Stack";

const Item = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Title
        </Typography>
        <Typography variant="body1">well meaning and kindly.</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit" size="small" color="success">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" color="error">
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default function Notes() {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        style={{ margin: "20px" }}
      >
        <Button
          variant="contained"
          size="large"
          color="info"
          startIcon={<AddIcon />}
        >
          NEW
        </Button>
      </Stack>

      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item />
          </Grid>
          <Grid item xs={4}>
            <Item />
          </Grid>
          <Grid item xs={4}>
            <Item />
          </Grid>
          <Grid item xs={4}>
            <Item />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
