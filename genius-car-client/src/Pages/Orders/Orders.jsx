import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
	const { user, logOut } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetch(`https://genius-car-server-phi.vercel.app/orders?email=${user?.email}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('genius-token')}`,
			},
		})
			.then((res) => {
				if (res.status === 401 || res.status === 403) {
					return logOut();
				}
				return res.json();
			})
			.then((data) => {
				setOrders(data);
			});
	}, [user?.email, logOut]);

	const handleDelete = (id) => {
		const proceed = window.confirm('Are you sure you want to delete this order');
		if (proceed) {
			fetch(`https://genius-car-server-phi.vercel.app/orders/${id}`, {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${localStorage.getItem('genius-token')}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						toast.success('Delete order was successfully deleted');
						const remaining = orders.filter((odr) => odr._id !== id);
						setOrders(remaining);
					}
					console.log(data);
				});
		}
	};

	const handleStatusUpdate = (id) => {
		fetch(`https://genius-car-server-phi.vercel.app/orders/${id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('genius-token')}`,
			},
			body: JSON.stringify({ status: 'Approved' }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					const remaining = orders.filter((odr) => odr._id !== id);
					const approving = orders.find((odr) => odr._id === id);
					approving.status = 'Approved';
					const newOrders = [approving, ...remaining];
					setOrders(newOrders);
				}
				console.log(data);
			});
	};

	return (
		<div>
			<h2>You have {orders.length}</h2>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<OrderRow
								key={order._id}
								order={order}
								handleDelete={handleDelete}
								handleStatusUpdate={handleStatusUpdate}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Orders;
