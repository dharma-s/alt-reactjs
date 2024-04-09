// CustomerList.js
import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
    const history = useHistory();
    const [selectedValue, setSelectedValue] = useState('');
    const {token} = localStorage.getItem('token');
    console.log(token, "token ", localStorage);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [customers, setCustomers] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        axios.get('http://localhost:8000/api/plans/')
            .then(response => {
                setPlans(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handlePlanSelection = (customerId) => {
        history.push(`/customer/${customerId}/select-plan`);
    };

    const handlePlanUpgradation = (customerId) => {
        history.push(`/customer/${customerId}/upgrade-plan`);
    };

    return (
        <div className="registration-form">
            <h2>Customer List</h2>
            <select id="mySelect" value={selectedValue} onChange={handleChange}>
                <option value="">Select...</option>
                {plans.map(plan => (
                    <option value={plan.name} key={plan.id}>{plan.name}</option>
                ))}
                
            </select>
            <button>Upgrade My Plan</button>
            <table><thead>
            {/* Display customer data in a table */}
            <tr>
                <th>User</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.username}n</td>
                    <td>{customer.email_id}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
