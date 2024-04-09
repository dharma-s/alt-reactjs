// RegistrationForm.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { signupUser } from "@/store/features/user/userAction";

export default function signup(){
    const router = useRouter();
    const dispatch = useDispatch();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const res = await dispatch(signupUser(formData));
            alert('User registered:', res);
            alert('User registered successfully. Redirecting to login...');
            setTimeout(() => {
                // history.push('/'); // Redirect to login page
                router.push('/')
            }, 1000); // Redirect after 3 seconds
        }
    };

    return (
        <>
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
                <Link href={'/'}><button type="button">Login</button></Link>
            </form>
        </div>
        </>
    );
};


