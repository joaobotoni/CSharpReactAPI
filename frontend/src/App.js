import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduto from "./Pages/Produtos/AddProduto";
import MyProduto from "./Pages/Produtos/MyProduto";
import EditProduto from "./Pages/Produtos/EditProduto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyProduto />} />
        <Route path="/add-produtos" element={<AddProduto />} />
        <Route path="/edit-produtos/:id" element={<EditProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
