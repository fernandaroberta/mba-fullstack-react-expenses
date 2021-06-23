import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ExpensesScreen from "./ExpensesScreen";
import { currentPeriod } from "./helper";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/expenses/:month">
          <ExpensesScreen />
        </Route>
        <Redirect to={{ pathname: `/expenses/${currentPeriod}` }} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
