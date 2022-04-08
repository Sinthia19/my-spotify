import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                <Link to="/createPlaylist" className="nav-link">
                    CreatePlaylist
                </Link>
            </nav>
            <hr />
        </>
    );
}