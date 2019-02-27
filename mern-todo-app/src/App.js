import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">MERN Stack</Link>
          <div className="collpase nav-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todos</Link>
              </li>
            </ul>
          </div>
          </nav>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
        
      </Router>
           
    );
  }
}

export default App;
