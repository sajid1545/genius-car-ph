import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import signup from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { setAuthToken } from './../../api/auth';

const SignUp = () => {
	const { createUser, updateUserProfile } = useContext(AuthContext);

	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;

		createUser(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				handleUpdateUserProfile(name);
				toast.success('Registered successfully');
				setAuthToken(user)
			})
			.catch((e) => console.log(e));
	};

	const handleUpdateUserProfile = (name) => {
		const profile = {
			displayName: name,
		};

		updateUserProfile(profile)
			.then(() => {})
			.catch((e) => {
				toast.error(e.message);
				console.log(e);
			});
	};

	return (
		<div className="hero w-full my-20 ">
			<div className="hero-content flex-col gap-10 lg:flex-row grid md:grid-cols-2">
				<div className="text-center lg:text-left ">
					<img src={signup} alt="" className="w-3/4" />
				</div>
				<div className="card py-20 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form onSubmit={handleSignUp} className="card-body">
						<h1 className="text-5xl text-center font-bold">Sign Up !</h1>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder="Your Name"
								name="name"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								required
								placeholder="email"
								name="email"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								required
								placeholder="password"
								name="password"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control mt-6">
							<input className="btn btn-primary" type="submit" value="Sign Up" />
						</div>
					</form>
					<p className="text-center">
						Already have an account?
						<Link className="text-orange-600 font-bold my-3" to={'/login'}>
							Login
						</Link>{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
