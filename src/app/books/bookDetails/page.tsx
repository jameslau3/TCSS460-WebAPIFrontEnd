"use client";

import './display.css';
import * as React from "react";
import { IBook } from "@/core/model/books.model"
import { useRouter } from 'next/router'

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { IMessage } from "@/core/model/message.model";
//import PriorityAvatar from "../components/Priority";

export default function Book(isbn13: String) {
        const [book, setBook] = React.useState<IBook | null>(null);

        const urlParams = new URLSearchParams(window.location.search);
        const isbn = urlParams.get('isbn');

        // const getISBN = (isbn13: string) => {
        //     fetch("http://localhost:4000/isbn/?isbn=" + isbn13, {
        //       method: "GET", // *GET, POST, PUT, DELETE, etc.
        //     }).then((res) => res.json()) 
        //       .then((data) => setBook(data)
        //     );
        //   };
        

        //this is to test
      React.useEffect(() => {
          fetch("http://localhost:4000/books/isbn/?isbn=" + isbn)
            .then((res) => res.json())
            .then((data) => setBook(data));
        }, []);


      if (!book) {
        return <div><strong>Book hasn't been found</strong></div>;
      }


      
       //console.log("ISBN MFER: " + book.isbn13);
        return (
            <div> 
                
                <h1> {book.title} </h1>
                <img src={book.image_url} alt={book.title}/>
                <p><strong> Author(s):</strong> {book.authors}</p>
                <p><strong> Rating:</strong> {book.rating_avg} </p>
                <p><strong> isbn13:</strong> {book.isbn13}</p>
                <p><strong> Publication Year: </strong> {book.publication_year}</p>
                <p><strong> Total Ratings: </strong> {book.rating_count}</p>
                <p><strong> 1 Stars:</strong> {book.rating_1_star}</p>
                <p><strong> 2 Stars:</strong> {book.rating_1_star}</p>
                <p><strong> 3 Stars:</strong> {book.rating_3_star}</p>
                <p><strong> 4 Stars:</strong> {book.rating_4_star}</p>
                <p><strong> 5 Stars:</strong> {book.rating_5_star}</p>

            </div>
        );
}