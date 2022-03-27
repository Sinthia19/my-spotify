const Track = ({title, artist, album, url}) => {
    return(
        <div className="track-list">
            <img src={url} alt="title"/>
            <h2>{title}</h2>
            <h4>{artist}-{album}</h4>
        </div>
    );
};
export default Track;