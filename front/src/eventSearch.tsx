import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let spotifyID = sessionStorage.getItem('spotifyID');

interface Event {
    artist: {
        image_url: string;
    };
    venue: {
        name: string;
        location: string;
        latitude: number;
        longitude: number;
    };
    datetime: string;
    lineup: string[];
    artistName: string;
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
            console.log(searchTerm);
            let data: Event[] = await response.json();
            let eventDataWithArtistName = data.map((event) => ({
                ...event,
                artistName: searchTerm,
                datetime: new Date(event.datetime).toLocaleString()
            }));

            setEventData(eventDataWithArtistName);
        } catch (error) {
            console.error(error);
        }
    };

    let handleViewEvent = (eventIndex: number) => {
        console.log("Artist Name:", eventData[eventIndex].artistName);
        console.log("Venue: ", eventData[eventIndex].venue.name);
        console.log("Date: ", eventData[eventIndex].datetime);
        console.log("Lineup: ", eventData[eventIndex].lineup.join(', '));
        console.log("Location: ", eventData[eventIndex].venue.location);
        console.log("Latitude : ", eventData[eventIndex].venue.latitude);
        console.log("Longitude : ", eventData[eventIndex].venue.longitude);
        navigate('/viewEvent', { state: eventData[eventIndex] });
    };

    let handleSaveEvent = async (eventIndex: number) => {
        try {
            console.log("saving");
            let eventFields = {
                //Using my own spotify ID for not until I can grab spotify ID from cookie or however Luke makes it available
                spotifyID: spotifyID,
                artistName: eventData[eventIndex].artistName,
                venue: eventData[eventIndex].venue.name,
                dateTime: eventData[eventIndex].datetime,
                lineup: JSON.stringify(eventData[eventIndex].lineup),
                location: eventData[eventIndex].venue.location,
                latitude: eventData[eventIndex].venue.latitude,
                longitude: eventData[eventIndex].venue.longitude
            };

            let response = await fetch('/bands/saveEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventFields)
            });

            if (response.status === 200) {
                console.log('Event saved successfully!');
            } else {
                console.error('Error saving event');
            }

        } catch (error) {
            console.error(error);
        }
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
                            <button onClick={() => handleSaveEvent(index)}>Save Event</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );

};

export default EventSearch;
