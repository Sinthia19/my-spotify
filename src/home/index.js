import data from '../data';
import Album from '../components/album';
import Select from '../components/select';

function Home() {
  return(
    <div className="Home">
      <h1>Track Info</h1>
       <fieldset>
        <Album url={data.album.images[1].url}
               name={data.name}
               artists={data.artists[0].name}
               album={data.album.name}
        />
        <Select/>
     </fieldset>
    </div>
  );
}
export default Home;