import React, { useState, useEffect } from "react";
import NavBar from "../../Navbar/Navbar";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductForm.css";
import { BASE_URL } from "../../websocket/api/baseApi";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import authHeader from "../../../services/auth-header";

function ProductForm({ product }) {
  const [errors, setErrors] = useState({
    productNameError: "",
    descriptionError: "",
    genreError: "",
    priceError: "",
    pictureError: "",
    fileError: "",
  });
  const [picture, setPicture] = useState();

  let finalProduct;

  const validateProduct = () => {
    let productNameError = "";
    let descriptionError = "";
    let genreError = "";
    let priceError = "";
    let emptyError = "this field is required";
    let pictureError = "";
    const regex = /^\d+(\.\d{1,2})?$/;

    if (!document.getElementById("name").value) {
      productNameError = emptyError;
    }
    if (!document.getElementById("description").value) {
      descriptionError = emptyError;
    }
    if (!document.getElementById("genre").value) {
      genreError = emptyError;
    }
    if (!document.getElementById("price").value) {
      priceError = emptyError;
    } else if (!document.getElementById("price").value.match(regex)) {
      priceError = "invalid number";
    }
    if (!picture) {
      pictureError = "picture upload is required";
    }
    if (
      productNameError ||
      descriptionError ||
      genreError ||
      priceError ||
      pictureError
    ) {
      setErrors({
        productNameError: productNameError,
        descriptionError: descriptionError,
        genreError: genreError,
        priceError: priceError,
        pictureError: pictureError,
      });
      return false;
    }
    return true;
  };
  const handleFileSelected = (event) => {
    setPicture(event.target.files[0]);
  };
  const handleButton = (event) => {
    event.preventDefault();
    const isValid = validateProduct();

    if (isValid) {
      let game = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        price: document.getElementById("price").value,
        author: AuthService.getCurrentUser().username,
        url: "/images/" + picture.name,
      };

      const fd = new FormData();
      fd.append("file", picture, picture.name);
      axios
        .post(`${BASE_URL}/images/upload`, fd)
        .then((res) => console.log(res));

      if (!product) {
        console.log(authHeader());
        axios
          .post(`${BASE_URL}/games`, game, { headers: authHeader() })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        game.name = product.name;
        axios
          .put(`${BASE_URL}/games`, game, { headers: authHeader() })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setErrors({
        productNameError: "",
        descriptionError: "",
        genreError: "",
        priceError: "",
        pictureError: "",
      });
    }
  };
  return (
    <>
      <NavBar />

      <Form className="form">
        {!product ? <h1>Create product</h1> : <h1>Edit product</h1>}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            disabled={product}
            type="text"
            placeholder="Enter name"
            id="name"
          />
          <Form.Text className="text-danger">
            {errors.productNameError}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            id="description"
          />
          <Form.Text className="text-danger">
            {errors.descriptionError}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="Enter genre" id="genre" />
          <Form.Text className="text-danger">{errors.genreError}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step={0.1}
            placeholder="Enter price"
            id="price"
          />
          <Form.Text className="text-danger">{errors.priceError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            className="custom-file-label"
            id="picture"
            accept="image/*"
            label="picture"
            onChange={handleFileSelected}
          />
          <Form.Text className="text-danger">{errors.pictureError}</Form.Text>
          <Button id="button-upload" onClick={handleButton}>
            {" "}
            {!product ? <>Upload Game</> : <>Apply Changes</>}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ProductForm;
