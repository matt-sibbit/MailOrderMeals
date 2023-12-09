import React, { useState } from "react";

const SignUp = ({ onAuthChange }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        const userData = { fname, lname, username, email, password };
        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Signup successful");
                    console.log(response);
                } else {
                    throw new Error("Signup failed");
                }
                return response.json();
            })
            .then(() => {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userId', username);
                onAuthChange(true);
            })
            .catch((error) => {
                console.error("Error during sign up:", error);
                onAuthChange(false);
            });
    };

    return (
        <div>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={signUp}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;