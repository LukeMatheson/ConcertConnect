import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';

const Login = () => {
  
  const handleClick = () => {
    window.location.href = "http://localhost:3000/spotify/login";
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="primary">
        Login with Spotify
      </Button>
    </div>
  );
};


export default Login;