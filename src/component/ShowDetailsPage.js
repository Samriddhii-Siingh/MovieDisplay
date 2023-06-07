import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ShowDetailsPage.css';

const ShowDetailsPage = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    movieName: '',
    username: ''
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        setShow(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShowDetails();

    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [showId]);

  const handleBookTicket = () => {
    setFormData({ movieName: show.name });
    setBookingFormVisible(true);
  };

  const handleFormInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Store form data in local/session storage or perform any other necessary action
    // Reset the form and hide the booking form
    localStorage.setItem('formData', JSON.stringify(formData));
    setFormData({
      movieName: '',
      // Reset other form fields here
    });
    setBookingFormVisible(false);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-details">
      <h2>{show.name}</h2>
      <img src={show.image.medium} alt={show.name} />
      <p className="genres">Genres: {show.genres.join(', ')}</p>
      <p className="status">Status: {show.status}</p>
      <p className="summary">Summary: {show.summary}</p>

      <button onClick={handleBookTicket}>Book Ticket</button>

      {bookingFormVisible && (
        <form onSubmit={handleFormSubmit} className="booking-form">
          <h3>Booking Form</h3>
          <div>
            <label htmlFor="movieName">Movie Name:</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={formData.movieName}
              onChange={handleFormInputChange}
              readOnly
            />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleFormInputChange}
            />
          </div>
          {/* Add other relevant form fields here */}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ShowDetailsPage;
