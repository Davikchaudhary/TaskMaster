import React, { useState } from 'react';
import '../styles/Signup.css';
import logo from '../assets/images/logo.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        uname: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { uname, email, password } = formData;
        console.log(uname, email, password);
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json",
            },
            body: JSON.stringify({
                uname,
                email,
                password
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, 'userRegister');
            if (data.status === "ok") {
                setMessage("Registration successful. You can now login.");
                setFormData({
                    uname: "",
                    email: "",
                    password: "",
                });
                // Redirect to login page after successful registration
                window.location.href = "/login";
            } else {
                setMessage("Registration failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage("An error occurred. Please try again later.");
        });
    }
    

    return (
        <>
            <div className='loginContainer'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <img src={logo} alt="Logo" />

                        <div className='input-box'>
                            <input type='text' name="uname" placeholder='Username...' value={formData.uname} onChange={handleChange} required />
                        </div>

                        <div className='input-box'>
                            <input type='email' name="email" placeholder='Email...' value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className='input-box'>
                            <input type='password' name="password" placeholder='Password...' value={formData.password} onChange={handleChange} required />
                        </div>

                        <button type='submit'>Sign Up</button>

                        <div className="register-link">
                            <p>Already have an account? <a href='/Login'>Log In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
