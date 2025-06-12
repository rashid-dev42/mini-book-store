import "./UpdateBook.css";
import React, { useState, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import axios from "axios";

const GET_SINGLE_BOOK = gql`
  query GetSingleBook($bookId: String) {
    singleBook(bookId: $bookId) {
      _id
      imgPath
      title
      author
      price
      inStock
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: String, $imgPath: String, $title: String, $author: String, $price: Float, $inStock: Int) {
    updateBook(bookId: $bookId, imgPath: $imgPath, title: $title, author: $author, price: $price, inStock: $inStock) {
      message
      isSuccessful
    }
  }
`;

interface Book {
  _id: string,
  imgPath: string,
  title: string,
  author: string,
  price: number,
  inStock: number
}

interface BookIdProps {
  bookId: string
}

interface BookProps {
  book: Book
}

const DisplaySingleBook: React.FC<BookIdProps> = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_SINGLE_BOOK, { variables: { bookId: bookId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <UpdateSingleBook book={data.singleBook}/>
};

const UpdateSingleBook: React.FC<BookProps> = ({ book }) => {
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [newBookImage, setNewBookImage] = useState<any>(null);
  const [newBookImagePreview, setNewBookImagePreview] = useState<string>("");
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author);
  const [price, setPrice] = useState<string>(book.price.toString());
  const [inStock, setInStock] = useState<string>(book.inStock.toString());

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let uploadResponse: any = null;
    let bookImagePath = book.imgPath;
    if (newBookImagePreview !== "") {
      const formData = new FormData();
      formData.append("newBookImage", newBookImage);
      formData.append("bookId", book._id);
      uploadResponse = await axios.put(`${import.meta.env.VITE_BACKEND_EXPRESS_URL}/update-book-image`, formData);
      bookImagePath = uploadResponse.data.imgPath;
    }
    const bookInfo = {
      bookId: book._id,
      imgPath: bookImagePath,
      title,
      author,
      price: parseFloat(price),
      inStock: parseInt(inStock)
    };
    const updateBookResponse = await updateBook({ variables: {
      bookId: bookInfo.bookId,
      imgPath: bookInfo.imgPath,
      title: bookInfo.title,
      author: bookInfo.author,
      price: bookInfo.price,
      inStock: bookInfo.inStock
    } });
    console.log(updateBookResponse);
  };

  return (
    <div>
      <form className="UpdateBook-form" onSubmit={handleSubmit}>
        {(book.imgPath !== "" && newBookImagePreview === "") && <img src={import.meta.env.VITE_BACKEND_EXPRESS_URL + "/" + book.imgPath} alt=""/>}
        {newBookImagePreview !== "" && <img src={newBookImagePreview} alt=""/>}
        <h3>Change Book Image:</h3>
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files !== null) {
              setNewBookImagePreview(URL.createObjectURL(event.target.files[0]));
              setNewBookImage(event.target.files[0]);
            }
          }}
        />
        <h3>Edit Title:</h3>
        <input
          type="text"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
          required
        />
        <h3>Edit Author Name:</h3>
        <input
          type="text"
          value={author}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAuthor(event.target.value)}
          required
        />
        <h3>Edit Price:</h3>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
          required
        />
        <h3>Edit Items In-stock:</h3>
        <input
          type="number"
          min="0"
          step="1"
          value={inStock}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInStock(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form><br />
    </div>
  );
};

const UpdateBook: React.FC = () => {
  const [bookId, setBookId] = useState<any>("");
  const bookIdInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setBookId(bookIdInput?.current?.value);
  }

  return (
    <div>
      <h2 className="component-heading">Update Book</h2>
      <form className="UpdateBook-form" id="UpdateBook-search-form" onSubmit={handleSubmit}>
        <h3>Enter Book Id:</h3>
        <input
          type="text"
          ref={bookIdInput}
          required
        />
        <button type="submit">Search</button>
      </form><br />
      {bookId !== "" && <DisplaySingleBook bookId={bookId}/>}
    </div>
  );
};

export default UpdateBook;