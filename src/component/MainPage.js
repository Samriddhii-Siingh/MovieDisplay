import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';

const MainPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div>
      <h1>Show List</h1>
      <div className="card-container">
        {shows.map((show) => (
          <Link key={show.show.id} to={`/show/${show.show.id}`}>
            <div className="card">
              <img src={show.show.image.medium} alt={show.show.name} />
              <h3>{show.show.name}</h3>
              <p>Rating: {show.show.rating.average}</p>
              <p>Status: {show.show.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
