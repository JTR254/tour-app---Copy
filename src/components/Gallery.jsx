import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";

// Gallery component displays a list of tours and allows filtering by destination
const Gallery = ({ tours, setTours, onRemove, selectedDestination, setSelectedDestination }) => {
  // State to manage loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch tours data from the API
  const fetchTours = async () => {
    try {
      const response = await fetch("/api/react-tours-project"); // Fetch data from API
      const data = await response.json();
      // Transform the data to include only necessary fields
      const trimmed = data.map(({ id, name, info, image, price }) => ({
        id,
        name,
        info: `${info}`,
        image,
        price: `$${price}`,
      }));
      setTours(trimmed); // Update the tours state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching tours:", error); // Log the error
      setError(true); // Set error state to true if fetching fails
      setLoading(false); // Stop loading
    }
  };

  // useEffect to fetch tours data when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Create a list of unique destinations for the filter dropdown
  const uniqueDestinations = ["All Destinations", ...new Set(tours.map((tour) => tour.name))];

  // Filter tours based on the selected destination
  const filteredTours =
    selectedDestination === "All Destinations"
      ? tours // Show all tours if "All Destinations" is selected
      : tours.filter((tour) => tour.name === selectedDestination); // Filter tours by name

  // Handle loading state
  if (loading) return <h2>Loading...</h2>;

  // Handle error state
  if (error) return <h2>Something went wrong...</h2>;

  // Handle case when no tours are left
  if (tours.length === 0)
    return (
      <>
        <h2>No tours left. Refresh to reload.</h2>
        <button onClick={fetchTours}>Refresh</button> {/* Reload data */}
      </>
    );

  // Render the component
  return (
    <>
      {/* Filter dropdown to select a destination */}
      <div className="filter-container">
        <label htmlFor="destination-filter">Filter by Destination:</label>
        <select
          id="destination-filter"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)} // Update selected destination
        >
          {uniqueDestinations.map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>

      {/* List of filtered tours */}
      <section className="tour-list">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} {...tour} onRemove={onRemove} /> // Render each tour as a TourCard
        ))}
      </section>
    </>
  );
};

export default Gallery;
