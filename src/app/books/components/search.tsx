"use client";
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import SearchByTitle from './SearchByTitle';
import { IBook } from "@/core/model/books.model";

export default function Search() {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<IBook[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await SearchByTitle(query); // Adjust page and limit as needed
      setResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Search for Books
        </Typography>
        <TextField
          label="Book Title"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2, width: '100%', maxWidth: '500px' }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <List sx={{ width: '100%', maxWidth: '500px', mt: 2 }}>
          {results.map((result, index) => (
            <ListItem key={index}>{result.title}</ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component={NextLink} href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  );
}