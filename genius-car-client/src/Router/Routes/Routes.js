import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Checkout from '../../Pages/Checkout/Checkout';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import Orders from '../../Pages/Orders/Orders';
import SignUp from '../../Pages/SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <SignUp />,
			},
			{
				path: '/checkout/:id',
				element: (
					<PrivateRoute>
						<Checkout />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`https://genius-car-server-phi.vercel.app/services/${params.id}`),
			},
			{
				path: '/orders',
				element: (
					<PrivateRoute>
						<Orders />
					</PrivateRoute>
				),
			},
		],
	},
]);
