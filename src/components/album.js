const Album = ({name, artists, album, url}) => {
    return(
        <div className="album">
            <img src={url} alt={name}/>
            <h1>{name}</h1>
            <h3>{artists}-{album}</h3>
        </div>
    );
};
export default Album;