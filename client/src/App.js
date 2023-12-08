import {React, useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SubscriptionPage from './components/Subscription';
import Home from './components/Home';
import Order from './components/Orders';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

	useEffect(() => {
		const isAuthenticatedValue = localStorage.getItem('isAuthenticated');
		console.log('Retrieved isAuthenticated from localStorage:', isAuthenticatedValue);
		setIsAuthenticated(isAuthenticatedValue === 'true');
	  }, []);

	const handleAuthentication = (status) => {
		setIsAuthenticated(status);
		localStorage.setItem('isAuthenticated', status.toString());
	  };
	
	  return (
		<Router>
		  <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
			<div className="container-fluid">
			  <Link className="navbar-brand" to="/">MailOrderMeals</Link>
			  <div className="collapse navbar-collapse">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				  {isAuthenticated && (
					<>
					  <li className="nav-item">
						<Link className="nav-link" to="/order">My Orders</Link>
					  </li>
					  <li className="nav-item">
						<Link className="nav-link" to="/subscription">Subscription</Link>
					  </li>
					  <li className="nav-item">
						<Link className="nav-link" to="/profile">Profile</Link>
					  </li>
					</>
				  )}
				</ul>
			  </div>
			</div>
		  </nav>
		  <div className="container mt-4">
			<Routes>
			  <Route path="/" element={<Home onAuthChange={handleAuthentication} isAuthenticated={isAuthenticated} />} />
			  {isAuthenticated && (
				<>
				  <Route path="/order" element={<Order />} />
				  <Route path="/subscription" element={<SubscriptionPage />} />
				  <Route path="/profile" element={<Profile />} />
				</>
			  )}
			</Routes>
		  </div>
		</Router>
	  );
	};
	

export default App;
