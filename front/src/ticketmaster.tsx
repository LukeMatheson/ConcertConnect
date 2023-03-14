import { useEffect, useState } from "react";

const TicketMaster = () => {
  const [artistName, setArtistName] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [errorMsg, setError] = useState("");

  useEffect(() => {
    fetch(`"/ticketmaster/eventTickets"`)
      .then((res) => {
        if (!res.ok) {
          throw Error("cannot fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setArtistName(data.artistName);
        setEventCity(data.eventCity);
      })
      .catch((err) => {
        setError(err.message);
      });
  });

  return (
    <div>
      <p>{artistName}</p>
      <p>{eventCity}</p>
    </div>
  );
};

export default TicketMaster;
