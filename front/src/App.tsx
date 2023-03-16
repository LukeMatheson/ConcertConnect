import NavBar from './navBar';
import Login from './login';
import EventSearch from './eventSearch';
import Dashboard from './Dashboard';
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
                        <Route path="/Dashboard" element={<Dashboard />}>
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
