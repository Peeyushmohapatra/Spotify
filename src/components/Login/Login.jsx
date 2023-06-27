import React from "react";
import "./Login.css";

const Login = () => {
  const handleClick = async () => {
    const client_id = "b73fbf5a33144978b187c7d720650b3e";
    const redirect_uri = "http://localhost:3000/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="loginContainer">
      <img
        className="spotifyLogo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      />
      <button className="loginButton" onClick={handleClick}>
        Connect Spotify
      </button>
    </div>
  );
};

export default Login;
