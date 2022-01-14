import React, { useState, useEffect } from "react";
import NavBar from "../../Navbar/Navbar";
import { BASE_URL } from "../../websocket/api/baseApi";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import authService from "../../../services/auth.service";
import Game from "../../Game/Game";
import authHeader from "../../../services/auth-header";

function ShoppingCart() {
  const [totalPrice, setPrice] = useState(0);
  const [order, setOrder] = useState();
  let orderDto;

  const handleCheckout = () => {
    orderDto = {
      userId: authService.getCurrentUser().id,
      orderFinished: false,
    };

    axios
      .put(`${BASE_URL}/orders/finish`, orderDto, { headers: authHeader() })
      .then((resp) => addProductOwnership(resp.data));

    setOrder();
  };
  const addProductOwnership = (items) => {
    // responsible for updating the relationship between users and games in the database
    // try backend call instead of this
    let payload = [];
    let reviewDto;
    items.forEach((i) => {
      reviewDto = {
        author: authService.getCurrentUser().username,
        gameId: i.id,
      };
      payload.push(reviewDto);
    });
    axios
      .post(`${BASE_URL}/reviews`, payload, { headers: authHeader() })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveFromCart = (id) => {
    //id of the game to be removed
    console.log(order);
    let newItems = [];
    order.items.forEach((i) => {
      if (i.id !== id) newItems.push(i);
    });
    setOrder({
      id: order.id,
      userId: order.userId,
      orderFinished: order.orderFinished,
      purchaseDate: order.purchaseDate,
      items: newItems,
    });
    removeRequest(id);
  };
  const removeRequest = (id) => {
    orderDto = {
      userId: authService.getCurrentUser().id,
      orderFinished: false, // probably not a necessary field
      gameId: id,
    };
    axios
      .put(`${BASE_URL}/orders/remove`, orderDto, { headers: authHeader() })
      .then((newItems) => {
        console.log(newItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTotalPrice = () => {
    if (order) {
      let price = 0;
      order.items.forEach((product) => {
        price += product.price;
      });
      setPrice(price);
    }
  };

  async function getCurrentCart(orderDto) {
    await axios
      .get(`${BASE_URL}/orders/${orderDto.userId}/${orderDto.orderFinished}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setOrder(...resp.data);
      });
  }

  useEffect(() => {
    orderDto = {
      userId: authService.getCurrentUser().id,
      orderFinished: false,
    };

    getCurrentCart(orderDto);
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [order]);

  return (
    <>
      <NavBar />
      <h1>Shopping cart </h1>
      {!order ? <></> : <h2>total price: {totalPrice} €</h2>}

      {!order || (order && order.items.length === 0) ? (
        <>Cart is empty</>
      ) : (
        <div className="cart-container">
          {console.log(order)}
          {order.items.map((p) => {
            return (
              <Game
                product={p}
                key={p.id}
                cartVariant={true}
                onRemove={handleRemoveFromCart}
              />
            );
          })}

          <Button
            className="btn w-25 display:grid"
            variant="success"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
