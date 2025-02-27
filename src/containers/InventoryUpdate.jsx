import React, { useState } from 'react';
import './InventoryUpdate.css'; // Import the CSS file

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'car_code', 'type_of_car', 'car_model', 
            'ancillary_available', 'cost', 'capacity',
            'salient_features'
        ];
        const missingFields = requiredFields.filter(field => !carData[field]);
        if (missingFields.length > 0) {
            alert(`Missing required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('/rental/inventory-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });
            const result = await response.json();
            if (result.success) {
                alert('Car added successfully');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the car');
        }
    };

    return (
        <div className="inventory-container">
            <h1>Update Inventory Car Data</h1>
            <form className="inventory-form" onSubmit={handleSubmit}>
                <label>
                    CAR_CODE:
                    <input type="text" name="car_code" value={carData.car_code} onChange={handleChange} placeholder="Enter CAR_CODE" />
                </label>
                <label>
                    TYPE_OF_CAR:
                    <input type="text" name="type_of_car" value={carData.type_of_car} onChange={handleChange} placeholder="Enter TYPE_OF_CAR" />
                </label>
                <label>
                    CAR_MODEL:
                    <input type="text" name="car_model" value={carData.car_model} onChange={handleChange} placeholder="Enter CAR_MODEL" />
                </label>
                <label>
                    ANCILLARY_AVAILABLE:
                    <input type="text" name="ancillary_available" value={carData.ancillary_available} onChange={handleChange} placeholder="Enter ANCILLARY_AVAILABLE" />
                </label>
                <label>
                    COST:
                    <input type="text" name="cost" value={carData.cost} onChange={handleChange} placeholder="Enter COST" />
                </label>
                <label>
                    CAPACITY:
                    <input type="text" name="capacity" value={carData.capacity} onChange={handleChange} placeholder="Enter CAPACITY" />
                </label>
                <label>
                    SALIENT_FEATURES:
                    <input type="text" name="salient_features" value={carData.salient_features} onChange={handleChange} placeholder="Enter SALIENT_FEATURES" />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default InventoryUpdate;
