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
    //console.log(myArray);
    console.log(genres);
    // props is the correct value, and setGenres refuses to set the state (????) here and on line 7 where it is declared
  }, []);
  return (
    <>
      {!genres ? (
        <></>
      ) : (
        <>
          <select id="dropdown" className="btn btn-dark" onChange={filter}>
            {console.log(genres)}
            <option defaultValue></option>
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
