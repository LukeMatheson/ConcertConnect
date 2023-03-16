import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




interface ArtistDataType {
    name: string,
    imageURL: string
}

const Dashboard = () => {
    const [spotifyID, setSpotifyID] = useState("");
    const [spotifyArtistData, setSpotifyArtistData] = useState<ArtistDataType[]>([]);

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        setSpotifyID(params.get("spotifyID") as string);

        fetch(`http://localhost:3000/spotify/topArtists/${spotifyID}`)
        .then(res => res.json())
        .then(function(data: ArtistDataType[]) {
            setSpotifyArtistData(data);
        });

    }, [spotifyID]);
    
    return (
        <div>
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                {spotifyArtistData.map((artist, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={artist.imageURL}
                                title={artist.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{artist.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Dashboard;