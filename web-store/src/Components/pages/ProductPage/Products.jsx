import React, { useState, useEffect } from "react";
import Game from "../../Game/Game";
import axios from "axios";
import NavBar from "../../Navbar/Navbar";
import "./Products.css";
import { Button } from "react-bootstrap";
import GenreFilter from "./GenreFilter/genre.filter";

function Products() {
  const [products, setProducts] = useState([]);

  const loadingMessage = "Loading Page...";

  let fullProductsList;
  let distinctGenres = [];

  async function getAllProducts() {
    await axios.get("http://localhost:8080/games/all").then((resp) => {
      const result = resp.data;
      setProducts(result);
    });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  function getDistinctGenres() {
    console.log(fullProductsList);
    if (fullProductsList) {
      var flags = [],
        output = [],
        l = fullProductsList.length,
        i;
      for (i = 0; i < l; i++) {
        if (flags[fullProductsList[i].genre]) continue;
        flags[fullProductsList[i].genre] = true;
        output.push(fullProductsList[i].genre);
      }
      console.log("distinct genres");
      distinctGenres = output;
    }
  }
  function setFullProductsList() {
    console.log(typeof fullProductsList);
    if (!fullProductsList && products.length > 0) {
      fullProductsList = products;
      getDistinctGenres();
      console.log("setFullProductsList");
    }
    return <></>;
  }
  function getFilteredProducts(name, genre) {
    if (name) {
      const filteredProducts = [];

      products.forEach((p) => {
        if (p.name.toLowerCase().includes(name.toLowerCase())) {
          filteredProducts.push(p);
        }
      });
      setProducts(filteredProducts);
    }
    if (genre) {
      const filteredProducts = [];
      products.forEach((p) => {
        if (p.genre.toLowerCase().includes(genre.toLowerCase())) {
          filteredProducts.push(p);
        }
      });
      setProducts(filteredProducts);
    }

    // dropdown filter
  }
  const handleSearch = () => {
    const searchedName = document.getElementById("searchbox").value;
    const genre = document.getElementById("dropdown").value;
    console.log(genre);
    //console.log("searched: " + searchedName);

    if (!searchedName && !genre && genre !== "Filter by genre...") {
      getAllProducts();
    } else {
      getFilteredProducts(searchedName, genre); //genre argument to be added
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
              {setFullProductsList()}
              {console.log(fullProductsList)}
              {console.log(products)}
              <GenreFilter genres={distinctGenres} onFilter={handleSearch} />
            </>
          )}

          <Button variant="success">Upload game</Button>
        </div>

        <div className="products-container">
          {!products ? (
            <>{loadingMessage}</>
          ) : (
            <>
              {products.map((p) => {
                return <Game product={p} key={p.id} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
