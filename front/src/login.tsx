import React, { useState, useEffect } from "react";
import axios from "axios";

interface SpotifyAuthType {
  id: string;
  display_name: string;
}

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [spotifyData, setSpotifyData] = useState<SpotifyAuthType>();

  const checkLogin = async () => {
    // Check if there's an access_token query parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      // Make a GET request to the Spotify Web API using the access token

      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response data");
      console.log(response.data);

      setLoggedIn(true);
      setSpotifyData(response.data);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      <a href="http://localhost:3000/spotify/login">Login with Spotify</a>
      {loggedIn && (
        <div>
          <p>You are logged in.</p>
          {spotifyData && (
            <div>
              <h2>{spotifyData.display_name}</h2>
              <p>ID: {spotifyData.id}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default Login;