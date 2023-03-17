import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface SpotifyArtistAlbumType {
  imageURL: string,
  albumName: string
}

const Artist = () => {
  const [spotifyID, setSpotifyID] = useState("");
  const [artistID, setArtistID] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistAlbums, setArtistAlbums] = useState<SpotifyArtistAlbumType[]>([]);

  useEffect(() => {
        
    const storedSpotifyID = sessionStorage.getItem("spotifyID");
    const storedArtistID = sessionStorage.getItem("artistID");
    const storedArtistName = sessionStorage.getItem("artistName");
    
    if (storedSpotifyID && storedArtistID && storedArtistName) {
        setSpotifyID(storedSpotifyID);
        setArtistID(storedArtistID);
        setArtistName(storedArtistName);
    }
  

    fetch(`/spotify/topAlbums/${spotifyID}/${artistID}`)
    .then(res => res.json())
    .then(function(data: SpotifyArtistAlbumType[]) {
        setArtistAlbums(data);
    });

}, [spotifyID, artistID]);
  
  return (
    <div style={{ height: '33vh', paddingTop: '20px' }}>
      <Typography variant="h4" align="center">{artistName}</Typography>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {artistAlbums.map((album, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardMedia component="img" image={album.imageURL} title={`Album ${index}`} />
              <CardContent>
                <Typography variant="h6">{album.albumName}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Artist;
