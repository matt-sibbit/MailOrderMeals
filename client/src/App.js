import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Order from './components/Order';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  return (
    <Router>
		<nav className="navbar navbar-expand-lg navbar-light navbar-custom">
			<div className="container-fluid">
					<Link className="navbar-brand" to="/">MailOrderMeals</Link>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/order">Order</Link>
							</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profile">Profile</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
      	<div className="container mt-4">
			<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/order" element={<Order />} />
			<Route path="/profile" element={<Profile />} />
			</Routes>
		</div>
	</Router>
  );
};

export default App;
