import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../../utils/api";
import Input from "../../../components/Input";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function MyProduto() {
  const [produtos, setProdutos] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategoria, setSearchCategoria] = useState("");

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (Array.isArray(response.data)) {
        setProdutos(response.data);
      } else {
        console.error("Error fetching products: response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      alert("Product deleted successfully!");
      fetchProdutos();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filterProdutosByName = (produtos, searchName) => {
    return produtos.filter((produto) => {
      const nomeLowerCase = produto.name.toLowerCase();
      const searchLowerCase = searchName.toLowerCase();
      return nomeLowerCase.startsWith(searchLowerCase);
    });
  };

  const filterProdutosByCategoria = (produtos, searchCategoria) => {
    return produtos.filter((produto) => {
      const categoriaLowerCase = produto.categoria.toLowerCase();
      const searchLowerCase = searchCategoria.toLowerCase();
      return categoriaLowerCase.startsWith(searchLowerCase);
    });
  };

  const filteredProdutosName = searchName
    ? filterProdutosByName(produtos, searchName)
    : produtos;

  const filteredProdutosCategoria = searchCategoria
    ? filterProdutosByCategoria(produtos, searchCategoria)
    : produtos;

  const filteredProdutos = filteredProdutosName.filter((produto) =>
    filteredProdutosCategoria.includes(produto)
  );

  return (
    <div className="container">
      <h2 className="my-4">Product List</h2>
      <div className="mb-3">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchName}
          handleChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          type="text"
          placeholder="Search by category"
          value={searchCategoria}
          handleChange={(e) => setSearchCategoria(e.target.value)}
        />
      </div>
      <Link to="/add-produtos" className="btn btn-primary mb-3">
        Add Product
      </Link>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>{produto.preco}</td>
              <td>{produto.categoria}</td>
              <td>{produto.quantidade}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(produto.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-produtos/${produto.id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyProduto;
