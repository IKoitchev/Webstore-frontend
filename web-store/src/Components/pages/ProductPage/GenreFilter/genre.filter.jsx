import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function GenreFilter(props) {
  //const [products, setProducts] = useState([]);

  //const myArray = new Array("element1", "element2");
  const [genres, setGenres] = useState();
  //console.log(myArray);

  const filter = () => {
    props.onFilter();
  };

  useEffect(() => {
    setGenres(props.genres);
  }, []);
  return (
    <>
      {!genres ? (
        <></>
      ) : (
        <>
          <select id="dropdown" className="btn btn-dark" onChange={filter}>
            <option defaultValue placeholder="clear filter"></option>
            {props.genres.map((genre, i) => (
              <option value={genre} key={i}>
                {genre}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
}

export default GenreFilter;
