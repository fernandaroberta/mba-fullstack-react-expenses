import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ExpensesScreen from "./ExpensesScreen";
import { currentPeriod } from "./helper";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/expenses/:month">
          <ExpensesScreen />
        </Route>
        <Redirect to={{ pathname: `/expenses/${currentPeriod}` }} />
      </Switch>
    </Router>
  );
}

export default App;
