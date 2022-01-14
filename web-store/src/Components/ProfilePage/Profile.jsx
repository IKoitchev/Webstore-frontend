import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import authService from "../../services/auth.service";
import axios from "axios";
import { BASE_URL } from "../websocket/api/baseApi";
import Game from "../Game/Game";
import "./Profile.css";
import authHeader from "../../services/auth-header";
function Profile() {
  const [user, setUser] = useState();
  const [ownedGames, setOwnedGames] = useState();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  useEffect(() => {
    if (user) {
      axios
        .get(`${BASE_URL}/games/ownedBy/${user.username}`, {
          headers: authHeader(),
        })
        .then((resp) => {
          console.log(resp);
          setOwnedGames(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const refundProduct = (id) => {
    axios
      .delete(
        `${BASE_URL}/reviews/delete/${id}/${
          authService.getCurrentUser().username
        }`,
        { headers: authHeader() }
      )
      .then(() => {
        let newOwnedGames = [];
        ownedGames.forEach((game) => {
          if (game.id !== id) newOwnedGames.push(game);
        });
        setOwnedGames(newOwnedGames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalPrice = () => {
    let price = 0;
    if (ownedGames) {
      ownedGames.forEach((game) => {
        price += game.price;
      });
      return <>{price}</>;
    }
    return <></>;
  };
  return (
    <>
      <NavBar />
      {!user ? (
        <>Loading user info ... </>
      ) : (
        <>
          <div className="user-info">
            <h2>User Info:</h2>
            <h4>Username: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h2>Statistics:</h2>
            <h4>
              total amount of money spent on this account: {totalPrice()}
              {" €"}
            </h4>
            <h2>Games owned:</h2>
          </div>
          {!ownedGames ? (
            <>Games loading... </>
          ) : (
            <>
              {ownedGames.map((game) => {
                return (
                  <Game
                    product={game}
                    key={game.id}
                    cartVariant={true}
                    onDelete={refundProduct}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
