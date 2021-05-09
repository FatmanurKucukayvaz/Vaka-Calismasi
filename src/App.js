import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboards from './containers/Dashboard/Dashboard';
import Detail from './containers/Dashboard/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Dashboards/>
        </Route>
        <Route exact path="/detail/:id" >
            <Detail/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
