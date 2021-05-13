import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Dashboard from './components/home/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
