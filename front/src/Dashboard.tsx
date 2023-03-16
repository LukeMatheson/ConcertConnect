import { useState, useEffect } from "react";

interface ArtistDataType {
    name: string,
    imageURL: string
}

const Dashboard = () => {
    const [spotifyID, setSpotifyID] = useState("");
    const [spotifyArtistData, setSpotifyArtistData] = useState<ArtistDataType>();

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        setSpotifyID(params.get("spotifyID") as string);

        fetch(`http://localhost:3000/spotify/topArtists/${spotifyID}`)
        .then(res => res.json())
        .then(function(data) {
            console.log(data);
        });

    }, [spotifyID]);
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in and redirected to Dashboard.</p>
        </div>
    );
};

export default Dashboard;
