import React, { useState, useEffect } from 'react';

const Subscription = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [frequency, setFrequency] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDay, setDeliveryDay] = useState('');
    const userEmail = localStorage.getItem('userId');

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const submitSubscription = () => {
        const productObj = products.find(p => p._id === selectedProduct);
        if (!productObj) {
            console.error('Selected product not found');
            return;
        }

        const subscriptionData = {
            product: productObj._id,
            size: productObj.size,
            frequency,
            deliveryAddress,
            deliveryDay,
        };
        
        console.log("Sending subscription data:", subscriptionData);
        const encodedEmail = encodeURIComponent(userEmail);
        fetch(`http://localhost:4000/customers/${encodedEmail}/subscription`, {
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
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
            >
                <option value="">Select a Product and Size</option>
                {products.map((prod) => (
                    <option key={prod._id} value={prod._id}>
                        {prod.name} - {prod.size}
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