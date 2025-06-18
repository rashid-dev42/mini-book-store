import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/utility/layout/Layout";
import AllBooks from "./components/allBooks/AllBooks";
import SingleBook from "./components/singleBook/SingleBook";
import AddBook from "./components/addBook/AddBook";
import UpdateBook from "./components/updateBook/UpdateBook";
import DeleteBook from "./components/deleteBook/DeleteBook";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <AllBooks />
          </Layout>}/>
          <Route path="/all-books" element={<Layout>
            <AllBooks />
          </Layout>}/>
          <Route path="/single-book" element={<Layout>
            <SingleBook />
          </Layout>}/>
          <Route path="/add-book" element={<Layout>
            <AddBook />
          </Layout>}/>
          <Route path="/update-book" element={<Layout>
            <UpdateBook />
          </Layout>}/>
          <Route path="/delete-book" element={<Layout>
            <DeleteBook />
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
