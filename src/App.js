
import './App.css';
import data from './Album/data.js';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <div className="App">
      <div className="playlist">
      <h1>Track Info</h1>
      <fieldset>
        <img src = {data.album.images[1].url}></img>
        <h1>{data.name}</h1>
        <h3>{data.artists[0].name} - {data.album.name}</h3>
        <button className="btn btn-primary">Play</button>
      </fieldset>
    </div>
  </div>
);
}

export default App;
