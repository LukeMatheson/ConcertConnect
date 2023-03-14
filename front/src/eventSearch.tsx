import React, { useState } from 'react';

interface Event {
    venue: string;
    date: string;
    location: string;
    lineup: string;
    image: string;
}

let EventSearch: React.FC = () => {
    let [searchTerm, setSearchTerm] = useState<string>('');
    let [eventData, setEventData] = useState<Event | null>(null);

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
            setEventData({
                venue: data.eventName,
                date: data.dateTime,
                location: data.eventLocation,
                lineup: data.lineup,
                image: data.artistImage
            });
        } catch (error) {
            console.error(error);
        }
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

            {eventData && (
                <>
                    {eventData.image && <img src={eventData.image} alt="Event" style={{ width: "300px" }} />}
                    <div style={{ border: "1px solid black", padding: "10px" }}>
                        <p><strong>Venue: </strong>{eventData.venue}</p>
                        <p><strong>Date: </strong>{eventData.date}</p>
                        <p><strong>Lineup: </strong>{eventData.lineup}</p>
                        <p><strong>Location: </strong>{eventData.location}</p>
                        <button onClick={handleSaveEvent}>Save Event</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventSearch;
