import React from "react";
import "./product.details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {} from "react-bootstrap";

function ProductDetails({ product }) {
  return (
    <>
      <h2>{product.name}</h2>
      <img src={product.url} alt="Loading image ... " />
      <h4>Full Description:</h4>
      <div>{product.description}</div>
    </>
  );
}

export default ProductDetails;
