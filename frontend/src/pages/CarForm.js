import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CarForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        try {
          const res = await axios.get(`https://car-spynee.onrender.com/api/cars/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
          });
          const { title, description, images, tags } = res.data;
          setTitle(title);
          setDescription(description);
          setImages(images);
          setTags(tags.join(', '));
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      };
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      title,
      description,
      images,
      tags: tags.split(',').map(tag => tag.trim())
    };
    try {
      if (id) {
        await axios.put(`https://car-spynee.onrender.com/api/cars/${id}`, carData, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
      } else {
        await axios.post('https://car-spynee.onrender.com/api/cars', carData, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
      }
      navigate('/cars');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div className="form-container">
      <form className="car-form" onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Car' : 'Add New Car'}</h2>
        <div className="form-group">
          <label htmlFor="title">Title<span className="required">*</span></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter car title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description<span className="required">*</span></label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter car description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
          <div className="image-preview">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags, separated by commas"
          />
        </div>
        <button type="submit" className="submit-button">
          {id ? 'Update Car' : 'Create Car'}
        </button>
      </form>

      <style jsx="true">{`
        /* Background Animation */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial, sans-serif';
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Form Container */
        .form-container {
          background: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 500px;
          animation: fadeInForm 1s ease-in-out;
        }

        @keyframes fadeInForm {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Form Styling */
        .car-form h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #333333;
          position: relative;
        }

        .car-form h2::after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background-color: #23a6d5;
          margin: 10px auto 0;
          border-radius: 2px;
          transition: width 0.3s ease-in-out;
        }

        .car-form h2:hover::after {
          width: 100px;
        }

        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 8px;
          font-weight: bold;
          color: #555555;
        }

        .required {
          color: red;
          margin-left: 4px;
        }

        .form-group input[type="text"],
        .form-group textarea {
          padding: 10px 15px;
          border: 1px solid #cccccc;
          border-radius: 8px;
          font-size: 1em;
          transition: border-color 0.3s ease;
        }

        .form-group input[type="text"]:focus,
        .form-group textarea:focus {
          border-color: #23a6d5;
          outline: none;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-group input[type="file"] {
          padding: 5px 0;
        }

        .image-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .image-preview img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #dddddd;
          transition: transform 0.3s ease;
        }

        .image-preview img:hover {
          transform: scale(1.1);
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #23a6d5;
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .submit-button:hover {
          background-color: #1b8cb4;
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          .form-container {
            padding: 30px 20px;
            margin: 20px;
          }

          .image-preview img {
            width: 60px;
            height: 60px;
          }

          .car-form h2 {
            font-size: 1.5em;
          }

          .submit-button {
            font-size: 1em;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CarForm;
