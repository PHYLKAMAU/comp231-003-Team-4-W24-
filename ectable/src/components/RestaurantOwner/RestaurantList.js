import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const RestaurantList = () => {
  const history = useHistory();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (id) => {
    history.push(`/update-restaurant/${id}`);
  };

  return (
    <div className="container mt-3">
      <h2>Restaurants</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>reviews</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleUpdate(restaurant.id)}>Update</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(restaurant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;