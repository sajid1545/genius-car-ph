import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
	const service = useLoaderData();

	const { title, price, _id } = service;

	const { user } = useContext(AuthContext);

	const handlePlaceOrder = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = `${form.firstName.value} ${form.lastName.value}`;
		const email = user?.email || 'unregistered';
		const message = form.message.value;
		const phone = form.phone.value;

		const order = {
			service: _id,
			serviceName: title,
			price: price,
			customer: name,
			email,
			phone,
			message,
		};

		// if (phone.length < 10) {
		//     alert('Phone number must be at least 10 characters long')
		// }

		fetch('https://genius-car-server-phi.vercel.app/orders', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('genius-token')}`,
			},
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					toast.success('orders successfully added');
					form.reset();
				}
				console.log(data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={handlePlaceOrder} className="my-10">
				<h2 className="text-4xl">You are about to Order : {title}</h2>
				<h4 className="text-3xl">{price}</h4>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						className="input input-bordered input-accent w-full "
					/>
					<input
						type="text"
						placeholder="Lat Name"
						name="lastName"
						className="input input-bordered input-accent w-full "
					/>
					<input
						type="text"
						placeholder="Your Phone"
						name="phone"
						required
						className="input input-bordered input-accent w-full "
					/>
					<input
						type="text"
						placeholder="Your Email"
						name="email"
						defaultValue={user?.email}
						readOnly
						className="input input-bordered input-accent w-full "
					/>
				</div>
				<textarea
					name="message"
					className="textarea textarea-success my-5 w-full"
					required
					placeholder="Your Message"></textarea>

				<input type="submit" className="btn mx-auto block btn-secondary" value="Place your Order" />
			</form>
		</div>
	);
};

export default Checkout;
