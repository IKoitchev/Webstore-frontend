import React, { useState, useEffect } from "react";
import "./game.details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import NavBar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import Game from "../../Game/Game";
import axios from "axios";
import { BASE_URL } from "../../websocket/api/baseApi";
import Moment from "react-moment";
import authService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";

function GameDetails() {
  const { name } = useParams();
  const [reviews, setReviews] = useState();
  const [game, setGame] = useState();

  function userOwnsGame() {
    let review;

    reviews.forEach((r) => {
      if (r.author === authService.getCurrentUser().username) {
        review = r;
      }
    });

    return review;
  }
  const handleSubmitReview = (event) => {
    console.log("handling");
    event.preventDefault();
    let text = document.getElementById("review-text").value;
    text = text.trim();
    if (text.length > 0) {
      let reviewDto = {
        gameId: game.id,
        author: authService.getCurrentUser().username,
        text: text,
      };
      axios
        .put(`${BASE_URL}/reviews`, reviewDto, { headers: authHeader() })
        .then((res) => {
          console.log(res);
          setReviews(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    document.getElementById("review-text").value = "";
  };
  const getReviews = () => {
    if (game)
      axios
        .get(`${BASE_URL}/reviews/${game.id}`)
        .then((res) => {
          setReviews(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getGameByName = () => {
    axios
      .get(`${BASE_URL}/games/${name}`, { headers: authHeader() })
      .then((res) => {
        console.log(res);
        setGame(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getGameByName();
  }, []);

  useEffect(() => {
    getReviews();
  }, [game]);

  return (
    <>
      <NavBar />
      {!game ? (
        <>loading...</>
      ) : (
        <>
          <Game product={game} cartVariant={true} />
          <>
            {!reviews ? (
              <>loading reviews...</>
            ) : (
              <>
                <div className="review-container">
                  <h1>Reviews</h1>
                  {reviews.map((review) => {
                    if (review.text) {
                      return (
                        <div className="review" key={review.id}>
                          <div className="review-content">
                            <h5>Review:</h5>
                            {review.text}
                          </div>
                          <div className="review-info">
                            Author:&nbsp; {review.author} <br />
                            {review.datePosted ? (
                              <>
                                Posted on: &nbsp;
                                <Moment format="DD.MM.YYYY HH:mm:ss">
                                  {review.datePosted}
                                </Moment>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                {userOwnsGame() ? (
                  <div className="review-container">
                    <Form>
                      <Form.Group className="mb-3 ">
                        <Form.Label>Your review</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter review"
                          id="review-text"
                        />
                        <Form.Text className="text-muted">
                          Share your thoughts with other users
                        </Form.Text>
                        <Button
                          id="review-button"
                          variant="primary"
                          type="submit"
                          onClick={handleSubmitReview}
                        >
                          Submit review
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                ) : (
                  <h5>You must purchase the game to write a review!</h5>
                )}
              </>
            )}
          </>
        </>
      )}
    </>
  );
}

export default GameDetails;
