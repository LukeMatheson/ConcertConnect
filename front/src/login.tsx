import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';

const Login = () => {
  
  const handleClick = () => {
    window.location.href = "/spotify/login";
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