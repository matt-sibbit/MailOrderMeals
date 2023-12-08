import React, { useState, useEffect } from 'react';

const OrderPage = () => {
	const [subscriptions, setSubscriptions] = useState([]);
  
	useEffect(() => {
	  const fetchData = async () => {
		const userEmail = localStorage.getItem('userId'); 
		const encodedEmail = encodeURIComponent(userEmail);
		const url = `http://localhost:4000/customers/${encodedEmail}/subscription`;
  
		try {
		  const response = await fetch(url);
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  const data = await response.json();
		  setSubscriptions(data ? [data] : []); 
		} catch (error) {
		  console.error('Error:', error);
		}
	  };
	  
	  fetchData();
	}, []); 
  
	return (
		<div className="container mt-4">
		  <h1>Subscription Details</h1>
		  {subscriptions.length === 0 ? (
			<div className="alert alert-info" role="alert">
			  No Subscriptions Found!
			</div>
		  ) : (
			<table className="table table-hover">
			  <thead className="table-light">
				<tr>
				  <th scope="col">Product</th>
				  <th scope="col">Frequency</th>
				  <th scope="col">Delivery Address</th>
				  <th scope="col">Delivery Day</th>
				</tr>
			  </thead>
			  <tbody>
				{subscriptions.map((subscription, index) => (
				  <tr key={index}>
					<td>{subscription.product}</td> {/* Product name or ID */}
					<td>{subscription.frequency}</td>
					<td>{subscription.deliveryAddress}</td>
					<td>{subscription.deliveryDay}</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  )}
		</div>
	  );
};

export default OrderPage;
