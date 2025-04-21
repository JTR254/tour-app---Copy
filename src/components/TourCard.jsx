import React from "react"; 
import "./TourCard.css";

// Displays a single tour card with details and a remove button
const TourCard = ({ id, name, info, image, price, onRemove }) => {
    return (
        <div className="tour-card">
            <img src={image} alt={name} className="tour-image" />
            <h3>{name}</h3>
            <p>{info}</p>
            <p>{price}</p>
            <button onClick={() => onRemove(id)}>Remove</button>
        </div>
    );
};

export default TourCard;
