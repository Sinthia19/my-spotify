import data from '../data';
import Track from '../components/track';
import Select from '../components/select';

const albumList = data.map((d) =>
<Track title={d.name}
       artist={d.artists[0].name}
       album={d.album.name}
       url={d.album.images[0].url}
       key={d.id}
 />);

function Home() {
  return(
    <div className="Home">
      <h1>Track Playlist</h1>
       <fieldset>
        {albumList}
        <Select/>
     </fieldset>
    </div>
  );
}
export default Home;