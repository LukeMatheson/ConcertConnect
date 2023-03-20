import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

let spotifyID = sessionStorage.getItem('spotifyID');


interface SpotifyArtistAlbumType {
  imageURL: string;
  albumName: string;
}

interface Event {
  artist: {
    image_url: string;
  };
  venue: {
    name: string;
    location: string;
  };
  datetime: string;
  lineup: string[];
  artistName: string;
}

const Artist = () => {
  const [spotifyID, setSpotifyID] = useState("");
  const [artistID, setArtistID] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistAlbums, setArtistAlbums] = useState<SpotifyArtistAlbumType[]>(
    []
  );
  const [eventData, setEventData] = useState<Event[]>([]);
  let navigate = useNavigate();

  let handleViewEvent = (eventIndex: number) => {
    navigate("/viewEvent", { state: eventData[eventIndex] });
  };

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
      .then((res) => res.json())
      .then(function (data: SpotifyArtistAlbumType[]) {
        setArtistAlbums(data);
      });

    fetch(`/bands/artistEvents?artist=${artistName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(function (data: Event[]) {
        let eventDataWithArtistName = data.map((event) => ({
          ...event,
          artistName: artistName,
          datetime: new Date(event.datetime).toLocaleString(),
        }));
        setEventData(eventDataWithArtistName);
      });
  }, [spotifyID, artistID, artistName]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ minHeight: "100px", paddingTop: "20px" }}>
        <Typography variant="h4" align="center">
          {artistName}
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {artistAlbums.map((album, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={album.imageURL}
                  title={`Album ${index}`}
                />
                <CardContent>
                  <Typography variant="h6">{album.albumName}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="content">
        <h1>Upcoming Events</h1>
        {eventData && eventData.length > 0 && (
          <>
            {eventData.map((event, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Venue: </strong>
                  {event.venue.name}
                </p>
                <p>
                  <strong>Date: </strong>
                  {event.datetime}
                </p>
                <p>
                  <strong>Lineup: </strong>
                  {event.lineup.join(", ")}
                </p>
                <p>
                  <strong>Location: </strong>
                  {event.venue.location}
                </p>
                <button onClick={() => handleViewEvent(index)}>
                  View Event
                </button>
              </div>
            ))}
          </>
        )}
        {eventData.length === 0 && (
          <>
            <div>
              <p>No upcoming events</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Artist;
