
//This component fetches the list of cars from our API and displays them:
//Khalid Dawd
//301144241
//2023/11/22

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/show-all-cars')
      .then(response => {
        setCars(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const seeCar = (id) => {
    navigate(`/show-car/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Cars for Rent</h2>
      <div>
        {cars.map(car => (
          <div key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '200px', height: '120px' }} />
            <h3>{car.make} {car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Color: {car.color}</p> 
            <p>Daily Price: ${car.dailyPrice}</p>
            <p>{car.available ? 'Available' : 'Not Available'}</p>
            <button type="button" onClick={() => seeCar(car._id)}>See This Car</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;

