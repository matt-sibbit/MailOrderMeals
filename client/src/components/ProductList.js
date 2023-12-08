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

  const [isSizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [selectedProtein, setSelectedProtein] = useState(null);

  const toggleSizeDropdown = () => {
    setSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const handleProteinSelect = (protein) => {
    setSelectedProtein(protein);
    setSizeDropdownOpen(true); // Open the size dropdown when protein is selected
  };


  return (
<div className="container mt-4">
      <h2>Our Products</h2>
      <div className="row">
        <div className="product">
          <div>Choose your item</div>
          <div>
            <div>
              <label>Select Protein:</label>
              <select onChange={(e) => handleProteinSelect(e.target.value)}>
                <option value="">Choose...</option>
                <option value="chicken">Chicken</option>
                <option value="beef">Beef</option>
                <option value="vegetable">vegetable</option>
                {/* Add more options as needed */}
              </select>
            </div>
            {selectedProtein && (
              <div>
                <label>Select Size:</label>
                <select>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            )}
          </div>
            <div>
            <input 
              type="Address"
              className="form-control mb-2"
              placeholder="Address"
            />
            </div>
            <div>
              <input 
                type="Delivery Frequency"
                className="form-control mb-2"
                placeholder="Delivery Frequency"
              />
          </div>

          <div>
          <input 
            type="Day of the week"
            className="form-control mb-2"
            placeholder="Day of the week"
          />
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductList;
