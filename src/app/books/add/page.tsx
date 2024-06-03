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
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

const DEFAULT_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/016/808/173/small/camera-not-allowed-no-photography-image-not-available-concept-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg";
const DEFAULT_SMALL_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/016/808/173/small/camera-not-allowed-no-photography-image-not-available-concept-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg";

export default function Send() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, boolean>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData(event.currentTarget);
    const requiredFields = [
      "id", "isbn", "series-title", "title", "author", "year",
      "rating count", "rating average", "rating one count",
      "rating two count", "rating three count", "rating four count",
      "rating five count"
    ];

    const errors: Record<string, boolean> = {};
    let hasErrors = false;

    requiredFields.forEach(field => {
      if (!data.get(field)) {
        errors[field] = true;
        hasErrors = true;
      } else {
        errors[field] = false;
      }
    });

    if (hasErrors) {
      setValidationErrors(errors);
      setError("Please fill in required fields.");
      return;
    }

    const bookData = {
      isbn13: data.get("isbn"),
      authors: data.get("author"),
      publication_year: data.get("year"),
      original_title: data.get("title"),
      title: data.get("title"),
      rating_avg: data.get("rating average"),
      rating_count: data.get("rating count"),
      rating_1_star: data.get("rating one count"),
      rating_2_star: data.get("rating two count"),
      rating_3_star: data.get("rating three count"),
      rating_4_star: data.get("rating four count"),
      rating_5_star: data.get("rating five count"),
      image_url: data.get("book image") || DEFAULT_IMAGE_URL,
      image_small_url: data.get("book small image") || DEFAULT_SMALL_IMAGE_URL,
    };
    

    try {
      const response = await fetch("http://localhost:4000/books/add_new_book/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${response.status} - ${errorData.message}`);
      } else {
        const result = await response.json();
        setSuccess("Book added successfully!");
        console.dir(result);
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

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
          <Typography component="h1" variant="h5" sx={{mb: 1.5}}>
            Add Book
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 420 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id"
                  id="id"
                  label="ID"
                  autoComplete="books-id"
                  autoFocus
                  error={validationErrors["id"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="isbn"
                  id="isbn"
                  label="ISBN"
                  autoComplete="books-isbn"
                  error={validationErrors["isbn"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="series-title"
                  id="series-title"
                  label="Series Title"
                  autoComplete="books-series"
                  error={validationErrors["series-title"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="title"
                  id="title"
                  label="Title"
                  autoComplete="books-title"
                  error={validationErrors["title"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="author"
                  id="author"
                  label="Author"
                  autoComplete="books-author"
                  error={validationErrors["author"]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="year"
                  id="year"
                  label="Publication Year"
                  autoComplete="books-year"
                  error={validationErrors["year"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating count"
                  id="rating count"
                  label="Rating Count"
                  autoComplete="books-rating-count"
                  error={validationErrors["rating count"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating average"
                  id="rating average"
                  label="Ratings Average"
                  autoComplete="books-rating-average"
                  error={validationErrors["rating average"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>                <TextField
                  required
                  fullWidth
                  name="rating one count"
                  id="rating one count"
                  label="Rating One Count"
                  autoComplete="books-rating-one-count"
                  error={validationErrors["rating one count"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating two count"
                  id="rating two count"
                  label="Rating Two Count"
                  autoComplete="books-rating-two-count"
                  error={validationErrors["rating two count"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating three count"
                  id="rating three count"
                  label="Rating Three Count"
                  autoComplete="books-rating-three-count"
                  error={validationErrors["rating three count"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating four count"
                  id="rating four count"
                  label="Rating Four Count"
                  autoComplete="books-rating-four-count"
                  error={validationErrors["rating four count"]}
                />
              </Grid>
              <Grid item xs={12} sm={3} />
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rating five count"
                  id="rating five count"
                  label="Rating Five Count"
                  autoComplete="books-rating-five-count"
                  error={validationErrors["rating five count"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="book image"
                  id="book image url"
                  label="Book Image URL"
                  autoComplete="books-image-url"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="book small image"
                  id="book small image url"
                  label="Book Small Image URL"
                  autoComplete="books-small-image-url"
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