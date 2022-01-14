import React from "react";
import { useState, useEffect } from "react";
import { Card, Accordion, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";
import { BASE_URL } from "../websocket/api/baseApi";
import axios from "axios";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import authHeader from "../../services/auth-header";

function Game({ product, cartVariant, onRemove, onDelete, onDeleteAdmin }) {
  const [game, setGame] = useState(product);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  let orderDto;
  const handleRemove = () => {
    // game removed from profile
    onRemove(game.id);
  };

  const handleDeleteProductByAdmin = () => {
    //game deleted completeky
    onDeleteAdmin(game.id);
  };

  const handleDelete = () => {
    onDelete(game.id);
  };
  const handAddToCart = () => {
    orderDto = {
      userId: authService.getCurrentUser().id,
      orderFinished: false,
      gameId: game.id,
    };
    console.log(orderDto);
    axios
      .put(`${BASE_URL}/orders/add`, orderDto, { headers: authHeader() })
      .then((res) => {
        //console.log(res);
        setSuccessMessage("Added to cart!");
      })
      .catch((err) => setError(err.response.data));
  };
  return (
    <>
      {!cartVariant ? (
        <Card id={game.name}>
          <Card.Title>
            <Link id="title-link" to={"/details/" + game.name}>
              {game.name}
            </Link>
          </Card.Title>
          <Card.Img src={`${BASE_URL}${game.url}`} alt="pic not loading" />

          <Card.Body>
            <Card.Text>Price: {game.price} €</Card.Text>
            <Card.Text>
              Genre: <br></br>
              {game.genre}
            </Card.Text>
            <Accordion id="accordion-game">
              <Accordion.Header>More Info</Accordion.Header>
              <Accordion.Body>{game.description}</Accordion.Body>
              <Accordion.Body>
                <Button
                  id="add-to-cart-button"
                  variant="success"
                  onClick={handAddToCart}
                >
                  Add to cart
                </Button>
                {!authService.getCurrentUser().roles.includes("ROLE_ADMIN") ? (
                  <></>
                ) : (
                  <Button
                    id="add-to-cart-button"
                    variant="danger"
                    onClick={handleDeleteProductByAdmin}
                  >
                    {console.log(authService.getCurrentUser().roles)}
                    Delete
                  </Button>
                )}
              </Accordion.Body>
            </Accordion>
            {!error ? <></> : <Alert variant="danger">{error}</Alert>}
            {!successMessage ? (
              <></>
            ) : (
              <Alert variant="success">{successMessage}</Alert>
            )}
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="row product" id={game.name}>
            <div className="col-md-2">
              <img
                src={`${BASE_URL}${game.url}`}
                alt="image not found"
                height="150"
              />
            </div>
            <div className="col-md-8 product-detail">
              <Link id="title-link-cart-view" to={"/details/" + game.name}>
                {game.name}
              </Link>
              <h5>Genre:</h5>
              <p>{game.genre}</p>
              <h5>Description:</h5>
              <p>{game.description}</p>
            </div>
            <div className="col-md-2 product-price">{game.price} €</div>
            {!onRemove ? (
              <></>
            ) : (
              <Button
                id="remove-from-cart"
                variant="danger"
                onClick={handleRemove}
              >
                Remove from Cart
              </Button>
            )}
            {!onDelete ? (
              <></>
            ) : (
              <Button
                className="w-25 m-auto"
                id="delete-from-profile"
                variant="danger"
                onClick={handleDelete}
              >
                Refund product
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Game;
