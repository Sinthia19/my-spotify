import "./App.css";
import Auth from "./components/Auth"

const giphy_secret_key = process.env.REACT_APP_SPOTIFY_KEY

function App() {
return (
  <div className="App">
      <header className="App-header">
          <Auth />
          </header>
          </div>
);
}

export default App;

