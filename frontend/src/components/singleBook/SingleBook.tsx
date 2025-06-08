import "./SingleBook.css";
import React, { useState, FormEvent } from "react";
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
  const [bookId, setBookId] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setBookId(document.getElementById("book-id").value);
  };

  return (
    <div>
      <h2 className="component-heading">Single Book</h2>
      <form className="SingleBook-form" onSubmit={handleSubmit}>
        <h3>Enter Book Id:</h3>
        <input type="text" id="book-id"/>
        <button type="submit">Search</button>
      </form><br />
      {bookId !== "" && <DisplaySingleBook bookId={bookId} />}
    </div>
  );
};

export default SingleBook;