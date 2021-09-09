import React from "react"
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Grades from "./components/grades"
import GradesList from "./components/grades-list"
import Login from "./components/login"


function App() {
  const [user,setUser] = React.useState(null)

  async function login(user = null){
    setUser(user);
  }

  async function logout(user = null){
    setUser(null);
  }

  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/grades" className="navbar-brand">
        Grades-list
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/grades"} className="nav-link">
            Grades
          </Link>
        </li>
        <li className="nav-item" >
          { user ? (
            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.name}
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}

        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/grades"]} component={GradesList} />
        <Route 
          path="/gradesS"
          render={(props) => (
            <Grades {...props} user={user} />
          )}
        />
        <Route 
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
        />
      </Switch>
    </div>
  </div>
  );
}

export default App;
