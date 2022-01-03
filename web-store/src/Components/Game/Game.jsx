import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";
function Game(props) {
  const [game, setGame] = useState(props.product);

  return (
    <>
      <Card>
        <Card.Title>{game.name}</Card.Title>
        <Card.Img src={game.url} alt="pic not loading" />
        <Card.Body>
          <Card.Text>Price: {game.price}€</Card.Text>
          <Card.Text>Genre: {game.genre}</Card.Text>
          <Card.Text>{game.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Game;
