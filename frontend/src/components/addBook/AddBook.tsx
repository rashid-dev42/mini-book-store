import "./AddBook.css";
import React, { useState } from "react";
import axios from "axios";
import { useMutation, gql } from "@apollo/client";

interface Book {
  imgPath:  string,
  title: string,
  author: string,
  price: number,
  inStock: number
}

const AddBook: React.FC = () => {
  const [bookImage, setBookImage] = useState<any>(null);
  const [bookImagePreview, setBookImagePreview] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [inStock, setInStock] = useState<string>("");

  const ADD_BOOK = gql`
    mutation AddBook($imgPath: String, $title: String, $author: String, $price: Float, $inStock: Int) {
      addBook(imgPath: $imgPath, title: $title, author: $author, price: $price, inStock: $inStock) {
        message
        isSuccessful
      }
    }
  `;

  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bookImage", bookImage);
    const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_EXPRESS_URL}/upload-book-image`, formData);
    const newBook: Book = {
      imgPath: uploadResponse.data.imgPath,
      title,
      author,
      price: parseFloat(price),
      inStock: parseInt(inStock)
    };
    const addBookResponse = await addBook({ variables: {
      imgPath: newBook.imgPath,
      title: newBook.title,
      author: newBook.author,
      price: newBook.price,
      inStock: newBook.inStock
    } });
    console.log(addBookResponse);
  };

  return (
    <div>
      <h2 className="component-heading">Add Book</h2>
      <form className="AddBook-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        {bookImagePreview !== "" && <img src={bookImagePreview} alt=""/>}
        <h3>Upload Book Image:</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files !== null) {
              setBookImagePreview(URL.createObjectURL(event.target.files[0]));
              setBookImage(event.target.files[0]);
            }
          }}
          required
        />
        <h3>Enter Title:</h3>
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
          required
        />
        <h3>Enter Author Name:</h3>
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAuthor(event.target.value)}
          required
        />
        <h3>Enter Price:</h3>
        <input
          type="number"
          min="0"
          step="0.01"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
          required
        />
        <h3>Enter Items In-stock:</h3>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInStock(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;