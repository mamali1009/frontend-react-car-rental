import React, { useState } from 'react';
import axios from 'axios';
import './InventoryUpdate.css';

const API_BASE_URL = 'https://fb4g06zjra.execute-api.us-west-2.amazonaws.com/prod';

const InventoryUpdate = () => {
    const [carData, setCarData] = useState({
        car_code: '',
        type_of_car: '',
        car_model: '', 
        ancillary_available: '',
        cost: '',
        capacity: '',
        salient_features: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            'car_code', 'type_of_car', 'car_model',
            'ancillary_available', 'cost', 'capacity', 
            'salient_features'
        ];
        
        const missingFields = requiredFields.filter(field => !carData[field].trim());
        
        if (missingFields.length > 0) {
            throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
        }

        if (isNaN(carData.cost) || isNaN(carData.capacity)) {
            throw new Error('Cost and capacity must be valid numbers');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            validateForm();

            const response = await axios.post(
                `${API_BASE_URL}/rental/inventory-update`,
                carData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        
                    }
                }
            );

            if (response.status === 200) {
                alert('Car inventory updated successfully');
                setCarData({
                    car_code: '',
                    type_of_car: '',
                    car_model: '',
                    ancillary_available: '',
                    cost: '',
                    capacity: '',
                    salient_features: ''
                });
            }

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
            console.error('Error updating inventory:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inventory-container">
            <h1>Update Inventory Car Data</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="inventory-form" onSubmit={handleSubmit}>
                <label>
                    CAR_CODE:
                    <input 
                        type="text" 
                        name="car_code" 
                        value={carData.car_code}
                        onChange={handleChange}
                        placeholder="Enter CAR_CODE"
                        disabled={loading}
                    />
                </label>
                <label>
                    TYPE_OF_CAR:
                    <input 
                        type="text"
                        name="type_of_car"
                        value={carData.type_of_car}
                        onChange={handleChange}
                        placeholder="Enter TYPE_OF_CAR"
                        disabled={loading}
                    />
                </label>
                <label>
                    CAR_MODEL:
                    <input 
                        type="text"
                        name="car_model"
                        value={carData.car_model}
                        onChange={handleChange}
                        placeholder="Enter CAR_MODEL"
                        disabled={loading}
                    />
                </label>
                <label>
                    ANCILLARY_AVAILABLE:
                    <input 
                        type="text"
                        name="ancillary_available"
                        value={carData.ancillary_available}
                        onChange={handleChange}
                        placeholder="Enter ANCILLARY_AVAILABLE"
                        disabled={loading}
                    />
                </label>
                <label>
                    COST:
                    <input 
                        type="number"
                        name="cost"
                        value={carData.cost}
                        onChange={handleChange}
                        placeholder="Enter COST"
                        disabled={loading}
                    />
                </label>
                <label>
                    CAPACITY:
                    <input 
                        type="number"
                        name="capacity"
                        value={carData.capacity}
                        onChange={handleChange}
                        placeholder="Enter CAPACITY"
                        disabled={loading}
                    />
                </label>
                <label>
                    SALIENT_FEATURES:
                    <input 
                        type="text"
                        name="salient_features"
                        value={carData.salient_features}
                        onChange={handleChange}
                        placeholder="Enter SALIENT_FEATURES"
                        disabled={loading}
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default InventoryUpdate;
