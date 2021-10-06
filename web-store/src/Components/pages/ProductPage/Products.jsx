import React, { useState, useEffect } from "react";
import Game from "../../Game/Game";
import axios from "axios";

function Products() {
  //const {loading, setLoading} = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/games/all");
      setProducts(request.data);
      //console.log(products);
      return request;
    }
    fetchData();
  }, []);
  return (
    <>
      {products.length === 0 ? (
        <>Loading products ...</>
      ) : (
        products.map((product, index) => {
          return <Game product={product} key={index} />;
        })
      )}
    </>
  );
}

export default Products;
