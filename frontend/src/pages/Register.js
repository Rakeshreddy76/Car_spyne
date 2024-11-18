import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://car-spynee.onrender.com', { username, email, password });
      localStorage.setItem('token', res.data.token);
      const token = localStorage.getItem('token');
      console.log(token);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <style>{`
        /* Container styling */
        .register-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          animation: backgroundFade 5s infinite alternate;
          padding: 20px;
          box-sizing: border-box;
        }

        /* Form styling */
        .register-form {
          background: white;
          padding: 30px 40px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: slideIn 1s ease-out forwards;
          opacity: 0;
          transform: translateY(-50px);
          width: 100%;
          max-width: 400px;
        }

        /* Form title */
        .form-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Input group */
        .input-group {
          margin-bottom: 15px;
        }

        /* Input fields with highlight on focus */
        .input-field {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 5px;
          transition: border-color 0.3s, box-shadow 0.3s;
          font-size: 16px;
          box-sizing: border-box;
        }

        .input-field:focus {
          border-color: #6c63ff;
          box-shadow: 0 0 8px rgba(108, 99, 255, 0.5);
          outline: none;
        }

        /* Submit button with hover effect */
        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #6c63ff;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .submit-button:hover {
          background-color: #5750d3;
          transform: translateY(-2px);
        }

        .submit-button:active {
          background-color: #4a42b0;
          transform: translateY(0);
        }

        /* Animations */

        /* Slide-in animation for the form */
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Background fade animation */
        @keyframes backgroundFade {
          from {
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          }
          to {
            background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
          }
        }

        /* Responsive design */
        @media (max-width: 500px) {
          .register-form {
            padding: 20px 25px;
          }
        }
      `}</style>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="form-title">Register</h2>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
