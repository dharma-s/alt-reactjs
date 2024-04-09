// CustomerTable.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const CustomerTable = ({ customers }) => {
    const history = useHistory();

    const handlePlanSelection = (customerId) => {
        history.push(`/customer/${customerId}/select-plan`);
    };

    const handlePlanUpgradation = (customerId) => {
        history.push(`/customer/${customerId}/upgrade-plan`);
    };

    return (
        <div>
            <h2>Customer Table</h2>
            <table>
                {/* Display customer data */}
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            {/* Display other fields */}
                            <td>
                                <button onClick={() => handlePlanSelection(customer.id)}>Select Plan</button>
                                <button onClick={() => handlePlanUpgradation(customer.id)}>Upgrade Plan</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
