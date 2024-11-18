import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        console.log(res);
        setCars(res.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleAddCar = () => {
    navigate('/create-car');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(search.toLowerCase()) ||
    car.description.toLowerCase().includes(search.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="car-list-container">
      <div className="header">
        <h1>Car Listings</h1>
        <div className="actions">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cars..."
            className="search-input"
          />
          <button onClick={handleAddCar} className="add-button">Add Car</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car._id} className="car-card">
              <div className="car-image">
                {car.images && car.images.length > 0 ? (
                  <img src={car.images[0]} alt={car.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="car-details">
                <h2>{car.title}</h2>
                <p>{car.description}</p>
                <div className="tags">
                  {car.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/cars/${car._id}`} className="details-link">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No cars found.</div>
        )}
      </div>

      <style jsx="true">{`
        /* Background Animation */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          min-height: 100vh;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Car List Container */
        .car-list-container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          animation: fadeInContainer 1s ease-in-out;
        }

        @keyframes fadeInContainer {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header Styling */
        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }

        .header h1 {
          margin-bottom: 20px;
          color: #333333;
          position: relative;
        }

        .header h1::after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background-color: #23a6d5;
          margin: 10px auto 0;
          border-radius: 2px;
          transition: width 0.3s ease-in-out;
        }

        .header h1:hover::after {
          width: 100px;
        }

        /* Actions Styling */
        .actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .search-input {
          padding: 10px 15px;
          border: 1px solid #cccccc;
          border-radius: 25px;
          font-size: 1em;
          width: 250px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: #23a6d5;
          outline: none;
        }

        .add-button, .logout-button {
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          font-size: 1em;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          color: white;
        }

        .add-button {
          background-color: #4CAF50;
        }

        .add-button:hover {
          background-color: #45a049;
          transform: translateY(-2px);
        }

        .logout-button {
          background-color: #f44336;
        }

        .logout-button:hover {
          background-color: #da190b;
          transform: translateY(-2px);
        }

        /* Cars Grid */
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        /* Car Card Styling */
        .car-card {
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .car-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .car-image {
          width: 100%;
          height: 180px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .car-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .car-image img:hover {
          transform: scale(1.05);
        }

        .no-image {
          color: #777777;
          font-size: 1.2em;
        }

        .car-details {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .car-details h2 {
          margin: 0 0 10px 0;
          color: #333333;
          font-size: 1.5em;
        }

        .car-details p {
          flex-grow: 1;
          color: #555555;
          margin-bottom: 15px;
          font-size: 1em;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }

        .tag {
          background-color: #e0e0e0;
          color: #333333;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.85em;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .tag:hover {
          background-color: #23a6d5;
          color: white;
        }

        .details-link {
          text-decoration: none;
          color: #23a6d5;
          font-weight: bold;
          transition: color 0.3s ease;
          align-self: flex-start;
        }

        .details-link:hover {
          color: #1b8cb4;
        }

        /* No Results Styling */
        .no-results {
          text-align: center;
          color: #777777;
          font-size: 1.2em;
          grid-column: 1 / -1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .search-input {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .actions {
            flex-direction: column;
            gap: 10px;
          }

          .search-input {
            width: 100%;
          }

          .add-button, .logout-button {
            width: 100%;
          }

          .car-details h2 {
            font-size: 1.3em;
          }

          .car-details p {
            font-size: 0.95em;
          }
        }
      `}</style>
    </div>
  );
}

export default CarList;
