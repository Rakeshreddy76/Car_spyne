import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 1. Define Gradient Animation Keyframes
const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  
  50% {
    background-position: 100% 50%;
  }
  
  100% {
    background-position: 0% 50%;
  }
`;

// 2. Create a Full-Screen Background Component
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  z-index: -1; /* Ensure the background stays behind other content */
`;

// Existing Fade-In Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Existing Underline Expand Animation
const underlineExpand = keyframes`
  from { width: 50px; }
  to { width: 100px; }
`;

// 3. Adjust Existing Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
  backdrop-filter: blur(10px); /* Optional: Adds a blur effect */
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333333;
  margin-bottom: 20px;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 4px;
    background-color: #ff7f50;
    margin: 10px auto 0;
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100px;
  }
`;

const Description = styled.p`
  font-size: 1.1em;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Increased spacing for larger images */
  margin-bottom: 30px;
  justify-content: center;
`;

const Image = styled.img`
  width: 300px; /* Increased from 200px */
  height: 200px; /* Increased from 150px */
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #333333;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7f50;
    color: #ffffff;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-width: 100px;
`;

const EditButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #da190b;
    transform: translateY(-2px);
  }
`;

// 4. Create a Responsive Container that Includes the Background
const ResponsiveContainer = styled(Container)`
  @media (max-width: 600px) {
    ${Image} {
      width: 100%; /* Adjusted for smaller screens */
      height: auto;
    }

    ${ButtonsContainer} {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

// 5. Update the CarDetail Component to Include the Background
function CarDetail() {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setCar(res.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://car-spynee.onrender.com/api/cars/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      navigate('/cars');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) return (
    <>
      <Background />
      <ResponsiveContainer>Loading...</ResponsiveContainer>
    </>
  );

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <Title>{car.title}</Title>
        <Description>{car.description}</Description>
        <ImagesContainer>
          {car.images.map((image, index) => (
            <Image key={index} src={image} alt={`Car ${index + 1}`} />
          ))}
        </ImagesContainer>
        <TagsContainer>
          {car.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        <ButtonsContainer>
          <EditButton onClick={() => navigate(`/cars/${id}/edit`)}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonsContainer>
      </ResponsiveContainer>
    </>
  );
}

export default CarDetail;
