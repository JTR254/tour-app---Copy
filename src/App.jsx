import React, { useState } from "react";
import Gallery from "./components/Gallery";

//Root component of the app
function App() {
  //Global state to manage tours
  const [tours, setTours] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");

  //Function to remove a tour from the list
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  return (
    <main>
      <h1>Tour Explorer</h1>
      {/* Pass state and handlers down to the Gallery component */}
      <Gallery
        tours={tours}
        setTours={setTours}
        onRemove={removeTour}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
      />
    </main>
  );
}

// Export the App component
export default App;
