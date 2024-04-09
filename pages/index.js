// Login.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/features/user/userAction";

export default function LoginForm(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let errorsObj = {};
        if (!credentials.username) {
            errorsObj.username = 'Username is required';
        }
        if (!credentials.password) {
            errorsObj.password = 'Password is required';
        }
        setErrors(errorsObj);
        return Object.keys(errorsObj).length === 0;
    };
    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
        console.log("login")
    },[])
    const handleLogin = async(e) => {
        e.preventDefault();
        if (validateForm()) {
          const res = await dispatch(loginUser(credentials));
          console.log(res, "res")
          if(res.status_code=="1"){
                alert("login successfull")
                localStorage.setItem('token', res.auth_token);
                router.push('/customer');
              }else{
                alert("Inconrect credentials")
              }
        }
    };

    return (
        <>
        <div className="registration-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} autoComplete="off"/>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <button type="submit">Login</button> or 
                <Link href={'/signup'}><button type="button">Signup</button></Link>
            </form>
        </div>
        </>
    );
};


