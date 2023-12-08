import React, { useState } from 'react';

const Subscription = () => {  
  const [product, setProduct] = useState(''); 
  const [frequency, setFrequency] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('');
  const userId = localStorage.getItem('userId');

  const submitSubscription = () => {
    const subscriptionData = {
      product,
      frequency,
      deliveryAddress,
      deliveryDay,
    };

    fetch(`http://localhost:4000/subscriptions/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Subscription creation failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Subscription created:', data);
    })
    .catch(error => {
        console.error('Error during subscription creation:', error);
        if (error.message) {
            console.error('Error message:', error.message);
        }
    });
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Delivery Address"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Delivery Day"
        value={deliveryDay}
        onChange={(e) => setDeliveryDay(e.target.value)}
      />
      <button className="btn btn-primary" onClick={submitSubscription}>Submit Subscription</button>
    </div>
  );
};

export default Subscription;
