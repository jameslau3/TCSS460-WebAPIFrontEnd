import { IBook } from "@/core/model/books.model";

export default async function SearchByTitle(title: string): Promise<IBook[]> {
  try {
    const response = await fetch(`http://localhost:4000/books/search?title=${title}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched books by title:", data); // Log the data
    return data;
  } catch (error) {
    console.error("Failed to fetch books by title:", error);
    throw error;
  }
}