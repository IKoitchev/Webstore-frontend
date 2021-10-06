import React, { Component } from "react";
import { useState, useEffect } from "react";

function Game(props) {
  const [game, setGame] = useState(props.product);

  return (
    <div>
      <h4>{game.id}. Name:</h4> {game.name} <br />
      <h4>Genre:</h4> {game.genre}
      <br />
      <h4>Description:</h4>
      {game.description}
      <br />
    </div>
  );
}

export default Game;
