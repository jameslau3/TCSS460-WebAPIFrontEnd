import { IBook } from "@/core/model/books.model"



export async function getAllBooks() {
    const res = await fetch("http://localhost:4000/books/all", {
        next: {tags : ["books"]},

        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()
    return Response.json(data)
}

export async function searchISBN(isbn13: string) { //whatever title the user enters. 
    const res = await fetch("http://localhost:4000/books/isbn/?isbn=" + isbn13, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()
    return data as IBook;
}

export async function searchTitle(title: string) { //whatever title the user enters. 
    const res = await fetch("http://localhost:4000/books/title/?title=" + title, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()
    return Response.json(data)
}

export async function searchAuthor(author: string) { //whatever the user put as the author 
    const res = await fetch("http://localhost:4000/books/author?author=" + author, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()
    return Response.json(data)
}


export async function searchYear(year: string) {
    const res = await fetch("http://localhost:4000/books/publication_year?publication_year=" + year, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}


export async function searchRating(rating: string) {
    const res = await fetch("http://localhost:4000/books/rating?rating=" + rating, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}