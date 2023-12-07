import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    //address? idk what else we need here
  });

  useEffect(() => {
    // fetch user info from db
    // setUser({ ...user, firstName: fname, lastName: lname, email: email });
  }, []);

  // if we wanna do edit functionality for user
  // const handleUpdate = (field, value) => {
  //   setUser({ ...user, [field]: value });
    
  // };

  return (
    <div className="container mt-4">
      <h1>Welcome {user.firstName}</h1>
      <p>Manage your account details and settings here.</p>

      <div>
        <h3>Profile Information</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        {/* whatever other fields we wanna add */}
        {/* If we wanna do edit functionality to send post request to db */}
      </div>
    </div>
  );
};

export default Profile;
