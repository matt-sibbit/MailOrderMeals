import React, { useState, useEffect } from 'react';

const OrderPage = () => {
	const [orders, setOrders] = useState([]);
  
	useEffect(() => {
	  const fetchData = async () => {
		const userEmail = "sample@example.com"; // gotta replace w actual user email/id or smth
		const url = `http://localhost:4000/api/orders/user/${userEmail}`;
  
		try {
		  const response = await fetch(url);
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  const data = await response.json();
		  setOrders(data.orders);
		} catch (error) {
		  console.error('Error:', error);
		}
	  };
	  
	  fetchData();
	}, []); 
  
	return (
		<div className="container mt-4">
		  <h1>Order History</h1>
		  {orders.length === 0 ? (
			<div className="alert alert-info" role="alert">
			  No Orders Yet!
			</div>
		  ) : (
			<table className="table table-hover">
			  <thead className="table-light">
				<tr>
				  <th scope="col">Order #</th>
				  <th scope="col">Date</th>
				  <th scope="col">Total</th>
				</tr>
			  </thead>
			  <tbody>
				{orders.map(order => (
				  <tr key={order._id}>
					<td>{order._id}</td>
					<td>{new Date(order.createdAt).toLocaleDateString()}</td>
					<td>${order.total.toFixed(2)}</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  )}
		</div>
	  );
};

export default OrderPage;
