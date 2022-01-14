import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import authService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import ShopingCart from "../pages/ShoppingCart/shopping.cart";

function NavBar() {
  const [redirect, logout] = useState(<></>);
  //when needed, update the state to render a Redirect component and redirect to another page

  const handleLogout = () => {
    if (authService.getCurrentUser()) {
      authService.logout();
      logout(<Redirect to="/" />);
    }
  };

  return (
    <div className="nvbr-container">
      {redirect}
      <Navbar bg="dark" variant="white" fixed="top">
        <Navbar.Brand> Video Game Store</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/chat">Chat Room</Nav.Link>
        </Nav>
        <Nav id="profile">
          {authService.getCurrentUser() ? (
            <Nav>
              {/* <Nav.Link href="/login">Log out</Nav.Link> */}
              <NavDropdown
                id="profile-dropdown"
                align={{ lg: "end" }}
                title={
                  <img
                    className="img-thumbnail"
                    src="/images/profile-picture.jpg"
                  />
                }
              >
                {/*<Nav.Link href="/profile">
                  </Nav.Link> */}
                <NavDropdown.Item disabled>
                  {authService.getCurrentUser().username}
                </NavDropdown.Item>{" "}
                <NavDropdown.Item eventKey="1" href="/profile">
                  Profile
                </NavDropdown.Item>{" "}
                {"\n"}
                <NavDropdown.Item eventKey="2" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                {"\n"}
                <NavDropdown.Item id="cart-dropdown" eventKey="3" href="/cart">
                  Shopping cart
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Log in</Nav.Link>
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
