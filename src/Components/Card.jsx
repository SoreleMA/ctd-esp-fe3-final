import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import doctorImage from "/images/doctor.jpg";

const Card = ({ name, username, id }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const currentFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(currentFavs.some((fav) => fav.id === id));
  }, [id]);

  const toggleFav = () => {
    const currentFavs = JSON.parse(localStorage.getItem("favorites")) || [];

    // Alternar favorito
    let updatedFavs;
    if (isFav) {
      updatedFavs = currentFavs.filter((fav) => fav.id !== id); 
    } else {
      updatedFavs = [...currentFavs, { name, username, id }]; 
    }

    
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFav(!isFav); // Cambiar estado local
  };

  return (
    <div className="card">
      <img src={doctorImage} alt="Doctor" className="card-image" />
      <Link to={`/dentist/${id}`} className="card-name">
        <h3>{name}</h3>
      </Link>
      <p>{username}</p>
      <button onClick={toggleFav} className={`favButton ${isFav ? "fav" : ""}`}>
        ★
      </button>
    </div>
  );
};

export default Card;