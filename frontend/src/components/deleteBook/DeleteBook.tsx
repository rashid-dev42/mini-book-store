import "./DeleteBook.css";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import ToastMessage from "../utility/toastMessage/ToastMessage";

const DeleteBook: React.FC = () => {
  const [bookId, setBookId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(true);
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false);

  const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: String) {
      deleteBook(bookId: $bookId) {
        message
        isSuccessful
      }
    }
  `;

  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await deleteBook({ variables: { bookId: bookId } });
    setMessage(response.data.deleteBook.message);
    setIsSuccessful(response.data.deleteBook.isSuccessful);
    setShowToastMessage(true);
  };

  return (
    <div>
      <h3 className="component-heading">Delete Book</h3>
      <form className="DeleteBook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBookId(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {showToastMessage && <ToastMessage message={message} isSuccessful={isSuccessful} setMessage={setMessage} setIsSuccessful={setIsSuccessful} setShowToastMessage={setShowToastMessage}/>}
    </div>
  );
};

export default DeleteBook;