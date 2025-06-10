import "./SingleBook.css";
import React, { useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import SingleItem from "../utility/singleItem/SingleItem";

const GET_SINGLE_BOOK = gql`
  query SingleBook($bookId: String) {
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

interface Props {
  bookId: string
}

const DisplaySingleBook: React.FC<Props> = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_SINGLE_BOOK, { variables: { bookId: bookId } });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <SingleItem book={data.singleBook}/>
};

const SingleBook: React.FC = () => {
  const [bookId, setBookId] = useState<any>("");
  const bookIdInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setBookId(bookIdInput?.current?.value);
  };

  return (
    <div>
      <h2 className="component-heading">Single Book</h2>
      <form className="SingleBook-form" onSubmit={handleSubmit}>
        <h3>Enter Book Id:</h3>
        <input type="text" ref={bookIdInput}/>
        <button type="submit">Search</button>
      </form><br />
      {bookId !== "" && <DisplaySingleBook bookId={bookId} />}
    </div>
  );
};

export default SingleBook;