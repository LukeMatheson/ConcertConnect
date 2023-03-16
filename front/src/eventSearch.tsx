import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



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
}


let EventSearch: React.FC = () => {
    let [searchTerm, setSearchTerm] = useState<string>('');
    let [eventData, setEventData] = useState<Event[]>([]);

    let navigate = useNavigate();


    let handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    let handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let response = await fetch(`/bands/artistEvents?artist=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            let data = await response.json();
            setEventData(data);
        } catch (error) {
            console.error(error);
        }
    };

    let handleViewEvent = (eventIndex: number) => {
        console.log("Venue: ", eventData[eventIndex].venue.name);
        console.log("Date: ", eventData[eventIndex].datetime);
        console.log("Lineup: ", eventData[eventIndex].lineup.join(', '));
        console.log("Location: ", eventData[eventIndex].venue.location);
        navigate('/viewEvent', { state: eventData[eventIndex] });
    };

    let handleSaveEvent = () => {
        // TODO
    };

    return (
        <div className="content">
            <h1>Search Upcoming Events</h1>
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="artist-name">Artist Name:</label>
                <input type="text" name="artist-name" value={searchTerm} onChange={handleSearch} />
                <button type="submit">Search</button>
            </form>
            {eventData && eventData.length > 0 && (
                <>
                    {eventData[0].artist && eventData[0].artist.image_url && <img src={eventData[0].artist.image_url} alt="Event" style={{ width: "300px" }} />}
                    {eventData.map((event, index) => (
                        <div key={index} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                            <p><strong>Venue: </strong>{event.venue.name}</p>
                            <p><strong>Date: </strong>{event.datetime}</p>
                            <p><strong>Lineup: </strong>{event.lineup.join(', ')}</p>
                            <p><strong>Location: </strong>{event.venue.location}</p>
                            <button onClick={() => handleViewEvent(index)}>View Event</button>
                            <button onClick={handleSaveEvent}>Save Event</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );

};

export default EventSearch;
