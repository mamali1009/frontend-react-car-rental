import React, { useState, useContext } from 'react';
import './RentalForm.css';
import { UserContext } from '../App';

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
    const [output, setOutput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMetrics, setShowMetrics] = useState(false);
    const [metrics, setMetrics] = useState(null);

    const API_URL = 'https://fb4g06zjra.execute-api.us-west-2.amazonaws.com/prod';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/rental/form`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ ...formData, username }),
            });
            const data = await response.json();
            if (data.success) {
                setOutput(data.output);
                setErrorMessage('');
            } else {
                setErrorMessage(data.message);
                setOutput('');
            }
        } catch (error) {
            setErrorMessage('Failed to submit form. Please try again.');
            setOutput('');
        }
    };

    const fetchMetrics = async () => {
        try {
            const response = await fetch(`${API_URL}/rental/metrics`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
            const data = await response.json();
            setMetrics(data.metrics);
        } catch (error) {
            setErrorMessage('Failed to fetch metrics. Please try again.');
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
                    <input type="number" name="no_of_adults" placeholder="Number of Adults" onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <input type="number" name="no_of_children" placeholder="Number of Children" onChange={handleChange} required />
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
            {output && (
                <div className="response">
                    <h2>Recommended Cars and Ancillaries</h2>
                    <div className="output-content">{output}</div>
                    <button onClick={() => setShowMetrics(true)}>Show Metrics</button>
                </div>
            )}
            {showMetrics && (
                <div className="metrics">
                    <h2>CloudWatch Metrics</h2>
                    <button onClick={fetchMetrics}>Fetch Metrics</button>
                    {metrics && (
                        <div className="metrics-content">
                            <pre>{JSON.stringify(metrics, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
            {errorMessage && <div className="response error">Error: {errorMessage}</div>}
        </div>
    );
};

export default RentalForm;
