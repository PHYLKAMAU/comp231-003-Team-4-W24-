// frontend/ectable/src/pages/RestaurantDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

// Assuming you have an API service to fetch restaurant details
import { list } from "./api-restaurant";

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  content: {
    padding: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#0077cc",
  },
};

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRestaurants(data);
      }
    });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!restaurants || restaurants.length === 0) return <div>Loading...</div>;
  return (
    <div style={styles.container}>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant._id}
          style={styles.card}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={styles.content}>
            {/*
            <img src={restaurant.photo} alt={restaurant.name} />
      */}
            <h3>Name : {restaurant.name}</h3>
            <p>Location : {restaurant.location}</p>
            <p>Rating : {restaurant.rating}</p>
            <p>Price : {restaurant.price}</p>
            <p>Open Hr : {restaurant.opening}</p>
            <p>Close Hr : {restaurant.closing}</p>
            <p>Phone : {restaurant.phone}</p>
            <p>Description : {restaurant.description}</p>
            {/* Link to the restaurant detail page */}
            <Link to={`../BookingPage/${restaurant._id}`} style={styles.link}>
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
