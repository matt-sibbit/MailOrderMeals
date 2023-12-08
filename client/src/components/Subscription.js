import React, { useState } from 'react';

const Subscription = ({ userId, onUpdateUser }) => {
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    frequency: '',
    deliveryAddress: '',
    deliveryDay: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubscriptionDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const updateSubscription = () => {
    //add this to the user object
    onUpdateUser(userId, { subscription: subscriptionDetails });
  };

  return (
    <div>
      <input
        type="text"
        name="frequency"
        className="form-control mb-2"
        placeholder="Frequency"
        value={subscriptionDetails.frequency}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="deliveryAddress"
        className="form-control mb-2"
        placeholder="Delivery Address"
        value={subscriptionDetails.deliveryAddress}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="deliveryDay"
        className="form-control mb-2"
        placeholder="Delivery Day"
        value={subscriptionDetails.deliveryDay}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary" onClick={updateSubscription}>Update Subscription</button>
    </div>
  );
};

export default Subscription;
