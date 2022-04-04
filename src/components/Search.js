import axios from "axios";
import { useState } from 'react';
import Track from '../components/Track'
import FormPlaylist from "../components/FormPlaylist";

const Search = ({ accessToken }) => {
    const [data, setData] = useState();
    const [query, setQuery] = useState("");

    const getData = async (accessToken) => {
        const data = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&access_token=${accessToken}`)
            .then((res) => res)
            .catch((err) => err);
        setData(data.data.tracks.items);
        console.log(data);
    }

    const handleOnChange = (e) => {
        setQuery(e.target.value)
    }
    
    return (
        <div>
            <FormPlaylist/>
            <hr/>
        <div className="search">
            <h4>Search Music Here... </h4>
            <div className="form-search">
            <input
            onChange={handleOnChange}
            type="text"
            name="text"
            placeholder="search..."
            required
          />

            <button onClick={() => { getData(accessToken) }}>Search</button>
            {data !== undefined && (
                <Track data={data}/>
            )
            }
        </div>
        </div>
        </div>
    )
}

export default Search;