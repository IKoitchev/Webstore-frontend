import Products from "./Components/pages/ProductPage/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/pages/HomePage/HomePage";
import Login from "./Components/auth/login.component";
import Register from "./Components/auth/register.component";
import ChatPage from "./Components/websocket/ChatPage/ChatPage";
import ProtectedRoute from "./Components/auth/protected.route";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products" component={Products} />
          {/* <Route path="/login" component={LoginPage} /> */}
          <Route path="/sign-up" component={Register} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/chat" component={ChatPage} />
          {/* <Route path="/chat" component={Websocket} /> */}
          <Route path="*" component={() => "404 page not found"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
