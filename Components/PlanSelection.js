import React, { useState } from 'react';
import axios from 'axios';

const PlanSelection = ({ customerId }) => {
    const [selectedPlanId, setSelectedPlanId] = useState('');

    const handleSelectPlan = () => {
        axios.post('http://localhost:8000/api/select_plan/', { customer_id: customerId, plan_id: selectedPlanId })
            .then(response => {
                // Handle success response
            })
            .catch(error => {
                console.error('Plan selection error: ', error);
            });
    };

    return (
        <div>
            {/* Display available plans and set selectedPlanId */}
            <button onClick={handleSelectPlan}>Select Plan</button>
        </div>
    );
};

export default PlanSelection;
