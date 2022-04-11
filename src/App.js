/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePlaylist from "./Home/createPlaylist";
import Login from "./Home/Login";

function App() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  return (
   <div className="App">
    <Router>
      <Switch>
        // eslint-disable-next-line react/react-in-jsx-scope
        <Route path="/create-playlist" exact>
          {isAuthorized ? 
          <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
   </div>
  );
}

export default App;


