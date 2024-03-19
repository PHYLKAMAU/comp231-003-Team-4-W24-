import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddRestaurant = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange
      });
      history.push('/restaurants');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price Range</label>
          <input type="number" className="form-control" id="price" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
