"use client";

import './display.css';
import * as React from "react";
import { IBook } from "@/core/model/books.model"
import { useRouter } from 'next/router'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
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
import BooksLayout from '../layout';
//import PriorityAvatar from "../components/Priority";

export default function Book(isbn13: String) {
        const [book, setBook] = React.useState<IBook | null>(null);

        //What was done at first. Didn't pop up the data right away so I moved on to utilize async.
      // React.useEffect(() => {
      //     fetch("http://localhost:4000/books/isbn/?isbn=" + isbn)
      //       .then((res) => res.json())
      //       .then((data) => setBook(data));
      //   }, []);

      React.useEffect(() => {
          const fetchBook = async () => {
            if (typeof window !== 'undefined') {
              const urlParams = new URLSearchParams(window.location.search);
              const isbn = urlParams.get('isbn');

              try {
                const result = await fetch('http://localhost:4000/books/isbn/?isbn=' + isbn);
                if (!result.ok) {
                  throw new Error('Book not found');
                }
                const data = await result.json();
                setBook(data);
              } catch (error) {
                console.error('Error fetching book:', error);
              }
            } 
          };
          fetchBook();
        }, [typeof window !== 'undefined' && window.location.search]);



      if (!book) {
        return <div><strong>Waiting... Book hasn't been found</strong></div>;
      }

      // const handleRatingIncrease = async (rating: number) => {
      //   try {
      //     const response = await fetch(`http://localhost:4000/books/newRating`, {
      //       method: 'PUT',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //         isbn: book.isbn13,
      //         changeRating: rating
      //       })
      //     });
      //     if (!response.ok) {
      //       throw new Error('Failed to increase rating');
      //     }
      //     const data = await response.json();
      //     setBook(data);
      //   } catch (error) {
      //     console.error("Error Updating Book: ", error);
      //   }
      // };

      //using this method instead because it updates the frontend right away instead of us having to refresh it.
      //however, doing this method does move the book around in the list for some reason.
      const handleRatingIncrease = async (rating: number) => {
        try {
          // Create a copy of the current book object
          const prevBook = { ...book };
          // Update the rating_avg and rating_count based on the new rating
          const rating_avg = (((prevBook.rating_avg * prevBook.rating_count) + rating) / (prevBook.rating_count + 1)).toFixed(2);
          prevBook.rating_avg = parseFloat(rating_avg);
          prevBook.rating_count++;
          // Update the count for the specific star rating
          switch (rating) {
            case 1:
              prevBook.rating_1_star++;
              break;
            case 2:
              prevBook.rating_2_star++;
              break;
            case 3:
              prevBook.rating_3_star++;
              break;
            case 4:
              prevBook.rating_4_star++;
              break;
            case 5:
              prevBook.rating_5_star++;
              break;
            default:
              break;
          }
          // Update the book state with the new values
          setBook(prevBook);
          // Send the PUT request to the server to update the rating 
          const response = await fetch(`http://localhost:4000/books/newRating`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              isbn: book.isbn13,
              changeRating: rating
            })
          });
          if (!response.ok) {
            throw new Error('Failed to increase rating');
          }
        } catch (error) {
          console.error("Error Updating Book: ", error);
        }
      };



        return (
          <div className="container book-details">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header text-center">
                  <h1>{book.title}</h1>
                </div>
                <div className="card-body d-flex">
                  <div className="image-container"> {/*insert image here*/}
                    <img src={book.image_url} alt={book.title} className="img-fluid book-image" />
                    <p className="isbn">ISBN: {book.isbn13}</p> {/* Display the ISBN under the image */}
                  </div>
                  <div className="details-container">
                    <h5 className="card-author">Author(s): {book.authors}</h5>
                    <p className="card-text">Book Description: (Fake Book Description to fill in blank space)</p>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime fugit optio accusantium, error harum inventore dolor modi facilis! Voluptate, ea! Voluptatum molestias ad maiores doloremque optio labore fugit, aliquam provident?</p>
                    <p className="card-text"><small className="text-muted">Published on: {new Date(book.publication_year).toLocaleDateString()}</small> <br></br>
                      <small>Original Title: <strong>{book.original_title}</strong></small>
                    </p>
                    <hr />
                    <h4 className="text-center">Ratings: </h4>
                    <p className="text-center">Average Rating: {book.rating_avg} ({book.rating_count} ratings)</p>
                    <div className="ratings-breakdown">
                      <p>                        
                        <IconButton
                            onClick={() => handleRatingIncrease(5)}
                          >
                              <AddBoxOutlinedIcon />
                          </IconButton>5 Stars: <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />{book.rating_5_star}
                      </p>
                      <p>                        
                        <IconButton
                            onClick={() => handleRatingIncrease(4)}
                          >
                              <AddBoxOutlinedIcon />
                          </IconButton>4 Stars: <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarBorderIcon/>{book.rating_4_star}
                      </p>
                      <p>                        
                        <IconButton
                            onClick={() => handleRatingIncrease(3)}
                          >
                              <AddBoxOutlinedIcon />
                          </IconButton>3 Stars: <StarIcon /> <StarIcon /> <StarIcon /> <StarBorderIcon/> <StarBorderIcon/>{book.rating_3_star}
                      </p>

                      <p> 
                        <IconButton
                            onClick={() => handleRatingIncrease(2)}
                          >
                              <AddBoxOutlinedIcon />
                          </IconButton>2 Stars: <StarIcon /> <StarIcon /> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> {book.rating_2_star}
                      </p>

                      <p>                        
                        <IconButton
                            onClick={() => handleRatingIncrease(1)}
                          >
                              <AddBoxOutlinedIcon />
                          </IconButton>1 Stars: <StarIcon /> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> {book.rating_1_star}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};