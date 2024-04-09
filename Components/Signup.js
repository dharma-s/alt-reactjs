// RegistrationForm.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        dob: '',
        email: '',
        adhar_number: '',
        assigned_mobile_number: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let errorsObj = {};
        if (!formData.username) {
            errorsObj.username = 'Username is required';
        }
        if (!formData.password) {
            errorsObj.password = 'Password is required';
        }
        if (!formData.adhar_number || formData.adhar_number.length !== 12) {
            errorsObj.adhar_number = 'Aadhar number must be 12 digits';
        }
        if (!formData.assigned_mobile_number || formData.assigned_mobile_number.length !== 10) {
            errorsObj.assigned_mobile_number = 'Mobile number must be 10 digits';
        }
        setErrors(errorsObj);
        return Object.keys(errorsObj).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:8000/api/register/', formData)
                .then(response => {
                    alert('User registered:', response.username);
                    setSuccessMessage('User registered successfully. Redirecting to login...');
                    setTimeout(() => {
                        history.push('/'); // Redirect to login page
                    }, 1000); // Redirect after 3 seconds
                })
                .catch(error => {
                    console.error('Registration error:', error?.response?.data);
                    const errorData = error.response.data;
                    let errorsObj = {};
                    if (error.response.data.username) {
                        errorsObj.username = error.response.data.username;
                    }
                    if (error.response.data.password) {
                        errorsObj.password = error.response.data.password;
                    }
                    if (error.response.data.adhar_number) {
                        errorsObj.adhar_number = error.response.data.adhar_number;
                    }
                    if (error.response.data.assigned_mobile_number) {
                        errorsObj.assigned_mobile_number = error.response.data.assigned_mobile_number;
                    }
                    setErrors(errorsObj);
                    // let errorMessage = '';
                    // // Iterate over the keys in the error data object
                    // Object.keys(error?.response?.data).forEach(key => {
                    //     // Concatenate the key and value into the errorMessage string
                    //     errorMessage += `${key}: ${errorData[key].join(', ')}\n`;
                    // });
                    // alert("server error", errorMessage)
                });
        }
    };

    return (
        <div className="registration-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Aadhar Number:</label>
                    <input type="text" name="adhar_number" placeholder="Aadhar Number" onChange={handleChange} />
                    {errors.adhar_number && <span className="error-message">{errors.adhar_number}</span>}
                </div>
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input type="text" name="assigned_mobile_number" placeholder="Mobile Number" onChange={handleChange} />
                    {errors.assigned_mobile_number && <span className="error-message">{errors.assigned_mobile_number}</span>}
                </div>
                <button type="submit">Signup</button> or 
                <Link to={'/'}><button type="button">Login</button></Link>
            </form>
        </div>
    );
};

export default Signup;
