import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import SignUp from './Signup';
import Login from './Login';

const HomePage = () => {

const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
useEffect(() => {
	const isAuthenticatedValue = localStorage.getItem('isAuthenticated');
	setIsAuthenticated(isAuthenticatedValue === 'true');
}, []);

const handleAuthentication = (status) => {
	setIsAuthenticated(status);
localStorage.setItem('isAuthenticated', status.toString());
};
return (
	<div className="container mt-4">
		<h1>Welcome to Our Online Grocery Store</h1>
		{/* <ProductList /> */}
		{isAuthenticated ? (
		<ProductList />
		) : (
		<div className="row">
			<div className="col-md-6">
			<SignUp onAuthChange={handleAuthentication} />
			</div>
			<div className="col-md-6">
			<Login onAuthChange={handleAuthentication}/>
			</div>
		</div>
		)}
	</div>
);
};
export default HomePage;