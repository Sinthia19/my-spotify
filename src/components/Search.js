import axios from "axios";
import { useState } from 'react';
import Track from '../components/Track'


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
        <div className="search">
            <h4>Search Music Here... </h4>
            <input onChange={handleOnChange} />
            <button onClick={() => { getData(accessToken) }}>Search</button>

            {data !== undefined && (
                <Track data={data}/>
            )

            }
        </div>
    )
}

export default Search;