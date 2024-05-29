// interface Book {
//     title: string;
//     authors: string;
//     publication_year: number;
//   }

  import { IBook } from "@/core/model/books.model";


export default async function SearchByTitle(title:String, page:Number, limit:Number) {
    var text:IBook[] = []
   
    try {
        const response = await fetch(`http://localhost:4000/books/title/${title}/?page=${page}&limit=${limit}`);
        if (response.ok) {
            const data = await response.json();
            if (data.entries && data.entries.length > 0) {
              text = data.entries;
            }
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
    }
    return text;
}