import React from "react";
import { useQuery, gql } from "@apollo/client";
import SingleItem from "../utility/singleItem/SingleItem";

interface Book {
  _id: string,
  imgPath: string,
  title: string,
  author: string,
  price: number,
  inStock: number
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      imgPath
      title
      author
      price
      inStock
    }
  }
`;

const DisplayBooks: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return data.books.map((book: Book) => {
    return (
      <SingleItem key={book._id} book={book} />
    );
  })
};

const AllBooks: React.FC = () => {
  return (
    <div>
      <h2 className="component-heading">All Books</h2>
      <DisplayBooks />
    </div>
  );
};

export default AllBooks;