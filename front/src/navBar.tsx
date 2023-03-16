import { Link } from "react-router-dom";

let NavBar = () => {
    return (
        <div>
            <h1>Concert Connect</h1>
            <Link to="/Dashboard">
                <button style={{ width: '150px' }}>Top Artists</button>
            </Link>
            <Link to="/SavedEvents">
                <button style={{ width: '150px' }}>Saved Events</button>
            </Link>
            <Link to="/SearchEvents">
                <button style={{ width: '150px' }}>Search Events</button>
            </Link>
        </div>
    );
};

export default NavBar;
