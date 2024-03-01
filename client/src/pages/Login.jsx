import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/images/logo.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email, password);
        fetch("http://localhost:5000/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
                alert("login successful");
                window.localStorage.setItem("token", data.data);
                window.localStorage.setItem("loggedIn", true);
                window.location.href = "./userDetails";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        });
    };

    return (
        <div className='loginContainer'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt="Logo" />

                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Email...'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Password...'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <div className='remember-forget'>
                        <label><input type='checkbox' />Remember me</label>
                        <a href='#'>Forget Password</a>
                    </div>

                    <button type='submit'>Log In</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
