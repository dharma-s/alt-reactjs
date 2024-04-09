// CustomerList.js
import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';

const CustomerList = () => {
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('');
    const [profile, setProfile] = useState({});
    const [token, setToken] = useState(false);
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Token ${token}`,
            };
            axios.get('http://localhost:8000/api/profile/',{ headers:headers})
                .then(response => {
                    setProfile(response.data?.data);
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
            // console.log(token, "token ", localStorage);
        }
    },[])

    const changePlan = () =>{
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Token ${token}`,
            };
            axios.post('http://localhost:8000/api/profile/', {plan:selectedValue} ,{ headers:headers})
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
            // console.log(token, "token ", localStorage);
        }else{
            alert('Invalid Attempt')
        }
    }

    const logout = () =>{
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            router.push('/')
        }
    }
    
    console.log(profile,"profile")
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [customers, setCustomers] = useState([]);
    const [plans, setPlans] = useState([]);

    // useEffect(() => {
    //     // if(token!=false){
            
    //     // }
    // }, [token]);

    const handlePlanSelection = (customerId) => {
        // history.push(`/customer/${customerId}/select-plan`);
    };

    const handlePlanUpgradation = (customerId) => {
        // history.push(`/customer/${customerId}/upgrade-plan`);
    };

    return (
        <div className="registration-form">
            <h2>Customer Detail</h2>
            <button onClick={logout}>Logout</button>
            <table><thead>
            {/* Display customer data in a table */}
            <tr>
                <th>User Details</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Username - {profile?.username}</td>
                <td>Email - {profile?.email}</td>
                <td>Plan Name - {profile?.plan__name}</td>
            </tr>
            </tbody>
            </table>
            <br/>
            <h4>Plan Detail</h4>
            {profile?.plan_name == null && ( 'No Plan opted' ) }<br/>
            <select id="mySelect" value={selectedValue} onChange={handleChange}>
                <option value="">Select...</option>
                {plans.map(plan => (
                    <option value={plan.id} key={plan.id}>{plan.name}</option>
                ))}
                
            </select>
            <button onClick={changePlan}>Upgrade My Plan</button>
        </div>
    );
};

export default CustomerList;
