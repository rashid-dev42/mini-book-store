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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
