"use client"

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import SearchByTitle from "../components/SearchByTitle";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListItem } from "@mui/material";
import { IBook } from "@/core/model/books.model";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";


var bookTitle = '';
var currentPage = 1;
var pageLimit:Number = 10;

interface Book {
  title: string;
  authors: string;
  publication_year: number;
}


function BookListItem({ //what one single book in a list should look like
    book,
    onDelete,
  }: {
    book: IBook;
    onDelete: (name: string) => void;
  }) {
    return (
      <ListItem 
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(book.isbn13)}
          >
            <DeleteIcon />
          </IconButton>
        }
        button component="a"
      >
        <ListItemIcon>
            {/* Use an Avatar component to display the image */}
            <Avatar src={book.image_small_url} />
        </ListItemIcon>
        <Link href={`../books/bookDetails?isbn=${book.isbn13}`} style={{color: "inherit", textDecoration: "none"}}>
                <ListItemText
                primary={book.title}
                secondary={book.authors}
                secondaryTypographyProps={{ color: "blue" }}
                />
        </Link>
        </ListItem>
    );
  }

export default function About() {
  const [bookText, setBookText] = React.useState<IBook[]>([]);
  const [books, setBooks] = React.useState<IBook[]>([]);
  //const [currentPage, setCurrentPage] = React.useState(1); // the page we'll start on.
  const [booksPerPage, setBooksPerPage] = React.useState(15); //in this case, we'll want 15 books to show up on one page
  const [totalPages, setTotalPages] = React.useState(0); //total page will at least be 0 pages if there's no book

  const handleSearch = async () => {
    const result = await SearchByTitle(bookTitle, currentPage, pageLimit);
    setBookText(result);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    pageLimit = (Number(event.target.value));
    handleSearch();
  }



  React.useEffect(() => {
    fetch("http://localhost:4000/books/all")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleDelete = (isbns: string) => {
    // fetch("http://localhost:4000/books/isbn" + isbns, {
    //   method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    // }).then(
    //   (res) => res.ok && setBooks(books.filter((bookItem) => bookItem.isbn13 != isbns))
    // );
  };


  
  return (
    <Container maxWidth="lg">
        <Typography variant="h4" component="h1" sx={{ 
            mb: -3, 
            diplay: "flex",
            flexDirection: "row", 
            justifyContent:"center", 
            alignItems:"center",
            textAlign:"center",
            marginTop: 1,
            fontFamily: "Georgia, sans-serif"}}>
          THE 460 LIBRARY
        </Typography>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField id="outlined-basic" label="Book Title" variant="outlined" onChange={(e) => {
          bookTitle = (e.target.value);
        }}/>
        <Button
        style={{
            marginLeft: 3,
            marginTop: 7,
            marginBottom: 10,
            width: '100px',  // adjust the width as needed
            height: '40px', // adjust the height as needed
            padding: '5px', // adjust the padding as needed
            flex: 'none'    // remove or adjust the flex property if needed
        }}
        variant="contained"
        onClick={handleSearch}
        >
        Search
        </Button>
        
      </Box>
      <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <Box sx={{ mt: 1 }}>
                <List>
                {books
                    .map((title, index, messages) => (
                    <React.Fragment key={"title book item: " + index}>
                        <BookListItem book={title} onDelete={handleDelete} />
                        {index < messages.length - 1 && (
                        <Divider variant="middle" component="li" />
                        )}
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
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </div>
    <Box>
        {/* Maybe add a link here to go get details about the book? ./bookDetails/?isbn=${book.isbn13} */}
     <Stack spacing={2}>
        {bookText.map((book, index) => (
          <Typography key={index} variant="body1">
            {book.title} ({book.publication_year})<br/>{book.authors}
          </Typography>
         ))}
      </Stack>
    </Box>
    <Button style={{marginRight:3}} variant="contained" onClick={() => {
        if (currentPage != 1) {
            currentPage = currentPage - 1;
        }
        handleSearch();
        }}>Previous Page</Button>
    <Button variant="contained" onClick={() => {
        currentPage = currentPage + 1;
        handleSearch();
      }}>Next Page</Button>
    <p>Current Page: {currentPage}</p>

    </Container>
    
  );
}