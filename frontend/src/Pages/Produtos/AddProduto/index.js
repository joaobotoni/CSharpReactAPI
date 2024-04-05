import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../../components/Input";
import apiUrl from "../../../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function AddProduto() {
  const [produto, setProduto] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduto();
  }, []);

  const fetchProduto = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (Array.isArray(response.data)) {
        setProduto(response.data);
      } else {
        setError("Error fetching products. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching products. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !produto.name ||
      !produto.preco ||
      !produto.categoria ||
      !produto.quantidade
    ) {
      setError("Error: Campos obrigatórios não preenchidos.");
      return;
    }

    try {
       await axios.post(apiUrl, produto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Produto adicionado com sucesso!");
    } catch (error) {
      setError(
        "Erro ao adicionar produto. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="col-sm-6 mb-3">
            <Input
              type="text"
              className="form-control"
              name="name"
              handleChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <Input
              type="number"
              className="form-control"
              name="preco"
              handleChange={handleChange}
              placeholder="Price"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <Input
              type="text"
              className="form-control"
              name="categoria"
              handleChange={handleChange}
              placeholder="Category"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <Input
              type="number"
              className="form-control"
              name="quantidade"
              handleChange={handleChange}
              placeholder="Quantity"
            />
          </div>
          <div>
            <button type="submit" className="mb-3 btn btn-primary">
              Add Product
            </button>
            <div>
              <Link to="/" className="btn btn-secondary mb-3">
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduto;
