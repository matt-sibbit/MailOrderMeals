import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(''); 
  const [frequency, setFrequency] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('');

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const addToOrder = (productId) => {
    const userId = localStorage.getItem('userId');
    const orderData = {
      product,
      frequency,
      deliveryAddress,
      deliveryDay
    };

    fetch(`http://localhost:4000/subscriptions/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response)
        throw new Error('Subscription creation failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Subscription created:', data);
    })
    .catch(error => {
      console.error('Error during subscription creation:', error);
    });
  };


  return (
    <div className="container mt-4">
      <h2>Our Products</h2>
      {products.length === 0 ? (
        <div className="alert alert-info">The store is empty!</div>
      ) : (
        <div className="row">
          {products.map(product => (
            <div className="col-sm-4 mb-4" key={product._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button onClick={() => addToOrder(product._id)} className="btn btn-primary">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
