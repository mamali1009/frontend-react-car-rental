import React, { useState, useContext } from 'react';
import './RentalForm.css';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const RentalForm = () => {
  const { username } = useContext(UserContext);
  const [formData, setFormData] = useState({
    pickup_location: '',
    pickup_date: '',
    pickup_time: 'Morning', 
    drop_off_location: '',
    drop_off_date: '',
    drop_off_time: 'Morning',
    age_verification: '18+',
    country: '',
    no_of_adults: '',
    no_of_children: '',
    vehicle_type: 'SUV',
    preference: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://54.213.93.110:5000/rental/form', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ ...formData, username }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate('/rental/result', { state: { output: data.output } });
      } else {
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Network error - please try again later');
    }
  };

  return (
    <div className="form-container">
      <h1>Rental Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="date" name="pickup_date" placeholder="Pickup Date" onChange={handleChange} required />
          <input type="text" name="pickup_location" placeholder="Pickup Location" onChange={handleChange} required />
          <select name="pickup_time" onChange={handleChange}>
            <option value="Morning">Morning</option>
            <option value="Noon">Noon</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div className="form-row">
          <input type="date" name="drop_off_date" placeholder="Drop-off Date" onChange={handleChange} required />
          <input type="text" name="drop_off_location" placeholder="Drop-off Location" onChange={handleChange} required />
          <select name="drop_off_time" onChange={handleChange}>
            <option value="Morning">Morning</option>
            <option value="Noon">Noon</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div className="form-row">
          <select name="age_verification" onChange={handleChange}>
            <option value="18+">18+</option>
            <option value="25+">25+</option>
            <option value="35+">35+</option>
            <option value="45+">45+</option>
            <option value="60+">60+</option>
          </select>
          <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
          <input type="number" name="no_of_adults" placeholder="Number of Adults" onChange={handleChange} required min="1" />
        </div>
        <div className="form-row">
          <input type="number" name="no_of_children" placeholder="Number of Children" onChange={handleChange} required min="0" />
          <select name="vehicle_type" onChange={handleChange}>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Sedan">Sedan</option>
            <option value="Luxury">Luxury</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
        <div className="form-row">
          <input type="text" name="preference" placeholder="Preference" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <div className="response error">Error: {errorMessage}</div>}
    </div>
  );
};

export default RentalForm;