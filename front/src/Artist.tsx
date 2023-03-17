const Artist = () => {
  console.log(sessionStorage.getItem("spotifyID"));
  console.log(sessionStorage.getItem("artistID"));
  console.log(sessionStorage.getItem("artistName"));
  
  return <div>Testing</div>;
};

export default Artist;
