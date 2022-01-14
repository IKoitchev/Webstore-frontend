import React, { useState, useEffect, useRef } from "react";
import Game from "../../Game/Game";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../Navbar/Navbar";
import "./Products.css";
import { Button } from "react-bootstrap";
import GenreFilter from "./GenreFilter/genre.filter";
import { BASE_URL } from "../../websocket/api/baseApi";
import authHeader from "../../../services/auth-header";

function Products() {
  const [products, setProducts] = useState([]);

  const loadingMessage = "Loading Page...";

  //this list doesnt change when using search/filter
  const fullProductsList = useRef();
  let distinctGenres = [];

  function getAllProducts() {
    axios
      .get("http://localhost:8080/games/all")
      .then((resp) => {
        fullProductsList.current = resp.data;
        setProducts(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const onDeleteAdmin = (id) => {
    axios
      .delete(`${BASE_URL}/games/delete/${id}`, { headers: authHeader() })
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getDistinctGenres() {
    if (fullProductsList.current) {
      var flags = [],
        output = [],
        l = fullProductsList.current.length,
        i;
      for (i = 0; i < l; i++) {
        if (flags[fullProductsList.current[i].genre]) continue;
        flags[fullProductsList.current[i].genre] = true;
        output.push(fullProductsList.current[i].genre);
      }

      distinctGenres = output;
    }
  }

  function getFilteredProducts(name, genre) {
    // as we have 2 sources of filter conditions, the name and genre search, there are 4 options for their values

    let filteredProducts = [];

    //both undefined
    if (!name && !genre) {
      filteredProducts = fullProductsList();
    }
    //name present only
    else if (name && !genre) {
      fullProductsList.current.forEach((p) => {
        if (p.name.toLowerCase().includes(name.toLowerCase())) {
          filteredProducts.push(p);
        }
      });
    }
    //genre present only
    else if (!name && genre) {
      fullProductsList.current.forEach((p) => {
        if (p.genre.toLowerCase().includes(genre.toLowerCase())) {
          filteredProducts.push(p);
        }
      });
    }
    //both present
    else {
      fullProductsList.current.forEach((p) => {
        if (
          p.genre.toLowerCase().includes(genre.toLowerCase()) &&
          p.name.toLowerCase().includes(name.toLowerCase())
        ) {
          filteredProducts.push(p);
        }
      });
    }
    setProducts(filteredProducts);
  }

  const handleSearch = () => {
    const searchedName = document.getElementById("searchbox").value;
    const genre = document.getElementById("dropdown").value;

    if (!searchedName && !genre && genre !== "Filter by genre...") {
      setProducts(fullProductsList.current);
    } else {
      getFilteredProducts(searchedName, genre);
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="filter-container">
          <h2>filter</h2>
          <div className="input-elements">
            <input
              type="text"
              className="btn btn-dark w-100"
              placeholder="Search.."
              onChange={handleSearch}
              id="searchbox"
            />
          </div>
          {!products ? (
            <></>
          ) : (
            <>
              {getDistinctGenres()}

              <GenreFilter genres={distinctGenres} onFilter={handleSearch} />
            </>
          )}

          {/* <Button variant="success" onClick={}>Upload game</Button> */}
          <Link
            to="/product-form"
            className="btn btn-primary"
            variant="success"
          >
            Upload a product
          </Link>
        </div>

        <div className="products-container">
          {!products ? (
            <>{loadingMessage}</>
          ) : (
            <>
              {products.map((p) => {
                return (
                  <Game product={p} key={p.id} onDeleteAdmin={onDeleteAdmin} />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
