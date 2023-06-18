import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const Main = () => {
	return (
		<div>
			<ScrollRestoration />
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Main;
