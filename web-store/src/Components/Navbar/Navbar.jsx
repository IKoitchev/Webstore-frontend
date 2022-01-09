import React, { Profiler } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
// import profile from ;

function NavBar() {
  return (
    <div className="nvbr-container">
      <Navbar bg="dark" variant="white" fixed="top">
        <Navbar.Brand> Video Game Store</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/chat">Chat Room</Nav.Link>
        </Nav>
        <Nav id="profile">
          <Nav.Link href="/profile">
            <img className="img-thumbnail" src="/images/profile-picture.jpg" />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
