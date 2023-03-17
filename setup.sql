CREATE TABLE SpotifyUsers (
    id INTEGER PRIMARY KEY,
    spotifyID TEXT,
    access_token TEXT,
    refresh_token TEXT
);

CREATE TABLE SavedEvents (
    spotifyID INTEGER,
    artistName TEXT,
    venue TEXT,
    dateTime dateTime,
    lineup TEXT,
    location TEXT
);