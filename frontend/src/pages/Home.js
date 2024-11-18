import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Car Management App</h1>
        <div className="buttons">
          <button className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>

      <style jsx="true">{`
        /* Reset default margins and paddings */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Full-screen background with gradient animation */
        body, html, #root {
          height: 100%;
        }

        .home-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Content Container */
        .content {
          background: rgba(255, 255, 255, 0.85);
          padding: 40px 60px;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          text-align: center;
          animation: fadeInContent 1s ease-in-out;
        }

        @keyframes fadeInContent {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Heading Styling */
        .content h1 {
          font-size: 2.5em;
          color: #333333;
          margin-bottom: 30px;
          position: relative;
        }

        /* Underline Animation for Heading */
        .content h1::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background-color: #23a6d5;
          margin: 10px auto 0;
          border-radius: 2px;
          transition: width 0.3s ease-in-out;
        }

        .content h1:hover::after {
          width: 100px;
        }

        /* Buttons Container */
        .buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Button Styling */
        .buttons button {
          padding: 12px 25px;
          font-size: 1em;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          color: white;
          min-width: 120px;
        }

        .register-button {
          background-color: #4CAF50;
        }

        .register-button:hover {
          background-color: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .login-button {
          background-color: #2196F3;
        }

        .login-button:hover {
          background-color: #1e88e5;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          .content {
            padding: 30px 20px;
          }

          .content h1 {
            font-size: 2em;
          }

          .buttons button {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
