import React, { useState, useEffect } from 'react';

const Subscription = () => {
    const [products, setProducts] = useState([]);
    const [size, setSize] = useState('');
    const [product, setProduct] = useState('');
    const [frequency, setFrequency] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDay, setDeliveryDay] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const submitSubscription = () => {
        const subscriptionData = {
            product,
            frequency,
            deliveryAddress,
            deliveryDay,
        };
        console.log("Sending subscription data:", subscriptionData);
        const encodedEmail = encodeURIComponent(userId);
        fetch(`http://localhost:4000/${encodedEmail}/subscription`, {
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
            {/* <input
type="text"
className="form-control mb-2"
placeholder="Product"
value={product}
onChange={(e) => setProduct(e.target.value)}
/> */}
            <select
                className="form-control mb-2"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
            >
                <option value="">Select a Product</option>
                {Array.from(new Set(products.map((prod) => prod.name))).map((productName) => (
                    <option key={productName} value={productName}>
                        {productName}
                    </option>
                ))}
            </select>
            <select
                className="form-control mb-2"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            >
                <option value="">Select a Size</option>
                {product && products
                    .filter((prod) => prod.name === product)
                    .map((prod) => (
                        <option key={prod._id} value={prod.size}>
                            {prod.size}
                        </option>
                    ))}
            </select>

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