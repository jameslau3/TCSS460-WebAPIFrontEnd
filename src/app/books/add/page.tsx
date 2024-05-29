"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormState, SendMessageFormSchema } from "./definitions";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Grid from "@mui/material/Grid";

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: "",
  alertSeverity: "",
};

export default function Send() {
  const [priority, setPriority] = React.useState(1);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const [formState, setFormState] = React.useState<FormState>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validateFields = SendMessageFormSchema.safeParse({
      name: data.get("name"),
      msg: data.get("msg"),
      priority: data.get("pri"),
    });

    if (!validateFields.success) {
      const error: FormState = {
        errors: validateFields.error?.flatten().fieldErrors,
      };
      error?.errors?.name;
      setFormState(error);

      console.log(error?.errors?.name && error.errors?.name[0]);
      console.dir({ errors: validateFields.error?.flatten().fieldErrors });
      return { errors: validateFields.error?.flatten().fieldErrors };
    } else {
      setFormState({});
    }

    fetch("http://localhost:4000/message/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
    })
      .then((res) =>
        res
          .json()
          .then((body) => ({ body: body, ok: res.ok, status: res.status }))
      )
      .then((res) => {
        console.dir(res);
        if (res.ok) {
          setAlert({
            showAlert: true,
            alertMessage: "Message sent!",
            alertSeverity: "success",
          });
        } else {
          setAlert({
            showAlert: true,
            alertMessage: "Message NOT sent! " + res.body.message,
            alertSeverity: "error",
          });
        }
        return;
      });
  };

  const handlePriorityClick = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: number
  ) => newPriority && setPriority(newPriority);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
            <CollectionsBookmarkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Book
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book ID"
                  id="id"
                  label="ID"
                  autoComplete="books-id"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book ISBN"
                  id="isbn"
                  label="ISBN"
                  autoComplete="books-isbn"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book series"
                  id="series-title"
                  label="Series Title"
                  autoComplete="books-series"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book title"
                  id="title"
                  label="Title"
                  autoComplete="books-title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book author"
                  id="author"
                  label="Author"
                  autoComplete="books-author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="book year"
                  id="year"
                  label="Publication Year"
                  autoComplete="books-year"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating count"
                  id="rating count"
                  label="Rating Count"
                  autoComplete="books-rating-count"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating average"
                  id="rating average"
                  label="Ratings Average"
                  autoComplete="books-rating-average"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating one"
                  id="rating one count"
                  label="Rating One Count"
                  autoComplete="books-rating-one-count"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating two"
                  id="rating two count"
                  label="Rating Two Count"
                  autoComplete="books-rating-two-count"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating three"
                  id="rating three count"
                  label="Rating Three Count"
                  autoComplete="books-rating-three-count"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating four"
                  id="rating four count"
                  label="Rating Four Count"
                  autoComplete="books-rating-four-count"
                />
              </Grid>
              <Grid item xs={12} sm={3} />
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="book rating five"
                  id="rating five count"
                  label="Rating Five Count"
                  autoComplete="books-rating-five-count"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
