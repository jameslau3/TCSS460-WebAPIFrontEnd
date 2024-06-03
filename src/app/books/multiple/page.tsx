"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItem from "@mui/material/ListItem";
import { IBook } from "@/core/model/books.model";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

interface Book {
  title: string;
  authors: string;
  publication_year: number;
}

function BookListItem({
  book,
  onDelete,
}: {
  book: IBook;
  onDelete: (name: string) => void;
}) {
  return (
    <ListItem
      sx={{ 
        backgroundColor: "#fff",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
        margin: "5px 0",
      }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
          <DeleteIcon />
        </IconButton>
      }
      button component="a"
    >
      <ListItemIcon>
        <Avatar src={book.image_small_url} />
      </ListItemIcon>
      <Link href={`../books/bookDetails?isbn=${book.isbn13}`} style={{ color: "inherit", textDecoration: "none" }}>
        <ListItemText primary={book.title} secondary={book.authors} />
      </Link>
    </ListItem>
  );
}

export default function About() {
  const [bookQuery, setBookQuery] = React.useState('');
  const [searchType, setSearchType] = React.useState('title');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(10);
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [bookText, setBookText] = React.useState<IBook[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchBooks = async (title: string, page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      let url = title 
        ? `http://localhost:4000/books/${searchType}/?${searchType}=${title}&page=${page}&limit=${limit}`
        : `http://localhost:4000/books/all?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await res.json();
      if (title) {
        setBookText(data);
      } else {
        setBooks(data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBooks(bookQuery, 1, pageLimit);
  };

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(String(event.target.value));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookQuery(event.target.value);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setPageLimit(Number(event.target.value));
    setCurrentPage(1);
    fetchBooks(bookQuery, 1, Number(event.target.value));
  };

  React.useEffect(() => {
    fetchBooks(bookQuery, currentPage, pageLimit);
  }, [currentPage, pageLimit]);

  const handleDelete = (isbns: string) => {
    fetch("http://localhost:4000/books/isbn", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ isbns: [isbns] })
    }).then(
      (res) => res.ok && setBooks(books.filter((bookItem) => bookItem.isbn13 != isbns))
    );
  };

  const displayedBooks = bookQuery ? bookText : books;
  const totalPages = Math.ceil(displayedBooks.length / pageLimit);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{
        mb: -3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: 1,
        fontFamily: "Georgia, sans-serif"
      }}>
        THE JAVAN 460 LIBRARY
      </Typography>
      <Box sx={{ my: 4, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Search</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={handleSearchTypeChange}
            autoWidth
            label="Search Type"
            value={searchType}
          >
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'author'}>Author</MenuItem>
            <MenuItem value={'rating'}>Min. Rating</MenuItem>
            <MenuItem value={'publication_year'}>Release Year</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" label="Book Search Query" variant="outlined" onChange={handleQueryChange} onKeyDown={(ent) => {
          if (ent.key === 'Enter') {
            handleSearch();
          }
        }}/>
        <Button
          style={{
            marginLeft: 3,
            marginTop: 7,
            marginBottom: 10,
            width: '100px',
            height: '40px',
            padding: '5px',
            flex: 'none'
          }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mt: 1 }}>
          <List>
            {displayedBooks.slice((currentPage - 1) * pageLimit, currentPage * pageLimit).map((book, index) => (
              <React.Fragment key={book.isbn13}>
                <BookListItem book={book} onDelete={() => {handleDelete(book.isbn13); let tempQ = bookQuery; setBookQuery(''); handleSearch(); setBookQuery(tempQ); handleSearch();}} />
                {index < displayedBooks.length - 1 && <Divider variant="middle" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>

      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={handleLimitChange}
            autoWidth
            label="Book Page Limit"
            value={pageLimit.toString()}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        style={{ marginRight: 3 }}
        variant="contained"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous Page
      </Button>
      <Button
        variant="contained"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next Page
      </Button>
      <p>Current Page: {currentPage}</p>
    </Container>
  );
}