import React from "react";
import { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";
function Game(props) {
  const [game, setGame] = useState(props.product);
  const APIurl = "http://localhost:8080";
  return (
    <>
      <Card>
        <Card.Title>{game.name}</Card.Title>
        <Card.Img src={APIurl + game.imageUrl} alt="pic not loading" />
        {console.log(props)}
        <Card.Body>
          <Card.Text>Price: {game.price}€</Card.Text>
          <Card.Text>
            Genre: <br></br>
            {game.genre}
          </Card.Text>
          <Accordion>
            <Accordion.Header>More Info</Accordion.Header>
            <Accordion.Body>{game.description}</Accordion.Body>
            <Accordion.Body>
              <Button variant="success">Add to cart</Button>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </>
  );
}

export default Game;
