import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/utility/layout/Layout";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <h2>All Books</h2>
          </Layout>}/>
          <Route path="/all-books" element={<Layout>
            <h2>All Books</h2>
          </Layout>}/>
          <Route path="/single-book" element={<Layout>
            <h2>Single Book</h2>
          </Layout>}/>
          <Route path="/add-book" element={<Layout>
            <h2>Add Book</h2>
          </Layout>}/>
          <Route path="/update-book" element={<Layout>
            <h2>Update Books</h2>
          </Layout>}/>
          <Route path="/delete-book" element={<Layout>
            <h2>Delete Book</h2>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
