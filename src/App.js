import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './component/MainPage';
import ShowDetailsPage from './component/ShowDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/show/:showId" element={<ShowDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
