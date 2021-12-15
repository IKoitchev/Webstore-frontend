import React from "react";
import NavBar from "../../Navbar/Navbar";
function HomePage() {
  return (
    <div>
      <NavBar />
      <h1>Home page</h1>
      <h3>To request all products from the database go to "/products"</h3>
    </div>
  );
}

export default HomePage;
