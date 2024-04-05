import React, { useState } from "react";
import axios from "axios";
import Input from "../../../components/Input";
import apiUrl from "../../../utils/api";
import { useParams, Link } from "react-router-dom";

function EditProduto() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [produto, setProduto] = useState({ id: id });

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
      await axios.put(`${apiUrl}/${id}`, produto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Produto editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      setError(
        "Erro ao editar produto. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
            Editar
          </button>
          <div>
            <Link to="/" className="btn btn-secondary mb-3">
              Voltar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduto;
