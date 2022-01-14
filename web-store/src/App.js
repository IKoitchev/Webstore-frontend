import Products from "./Components/pages/ProductPage/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/pages/HomePage/HomePage";
import Login from "./Components/auth/login.component";
import Register from "./Components/auth/register.component";
import ChatPage from "./Components/websocket/ChatPage/ChatPage";
import ProtectedRoute from "./Components/auth/protected.route";
import ShoppingCart from "./Components/pages/ShoppingCart/shopping.cart";
import ProductForm from "./Components/pages/ProductForm/ProductForm";
import GameDetails from "./Components/pages/ProductDetails/game.details";
import Profile from "./Components/ProfilePage/Profile";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products" component={Products} />
          <ProtectedRoute path="/product-form" component={ProductForm} />
          <Route path="/details/:name" component={GameDetails} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/sign-up" component={Register} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/cart" component={ShoppingCart} />
          <ProtectedRoute path="/chat" component={ChatPage} />

          <Route path="*" component={() => "404 page not found"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
