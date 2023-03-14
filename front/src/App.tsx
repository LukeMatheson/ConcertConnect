import NavBar from './navBar';
import Login from './login';
import EventSearch from './eventSearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="Pages">
                    <Routes>
                        <Route path="/" element={<Login />}>
                        </Route>
                        <Route path="/Login" element={<Login />}>
                        </Route>
                        <Route path="/TopArtists" element={<EventSearch />}>
                        </Route>
                        <Route path="/SavedEvents" element={<EventSearch />}>
                        </Route>
                        <Route path="/SearchEvents" element={<EventSearch />}>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
