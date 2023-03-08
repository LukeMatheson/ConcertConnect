import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Make a GET request to the /login endpoint of the backend server
    axios.get("http://localhost:3000/spotify/login").then((response) => {
      // Redirect the user to the Spotify authorization page
      window.location.href = response.data;
    });
  };

  const checkLogin = () => {
    // Check if there's an access_token query parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      // Set the loggedIn state to true and display a success message
      setLoggedIn(true);
    }
  };

  checkLogin();

  return (
    <div>
      <a href="http://localhost:3000/spotify/login">Login with Spotify</a>
      {loggedIn && <p>You are logged in.</p>}
    </div>
  );
};

export default Login;