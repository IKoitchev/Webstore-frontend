import Products from "./Components/pages/ProductPage/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products" component={Products} />
          <Route path="*" component={() => "404 page not found"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
