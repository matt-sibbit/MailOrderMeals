import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
    });
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        fetch(`http://localhost:4000/customers/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
        navigate('/');
    };


    return (
        <div className="container mt-4">
            <h1>Welcome {user.username}</h1>
            <p>Email: {user.email}</p>

            {/* <div>
<h3>Profile Information</h3>
<p><strong>Email:</strong> {user.email}</p>
<p><strong>First Name:</strong> {user.firstName}</p>
<p><strong>Last Name:</strong> {user.lastName}</p>
</div> */}
            <button onClick={handleLogout} className="btn btn-danger">
                Logout
            </button>
        </div>
    );
};

export default Profile;