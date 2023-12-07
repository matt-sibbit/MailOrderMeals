import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
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
    const userId = 'user123'; //temp for now replace after login done
    const orderData = { productId, userId };

    fetch('/api/orders/add', { //adjust for actual route in server.js
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => console.log('Order updated:', data))
    .catch(error => console.error('Error adding to order:', error));
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
