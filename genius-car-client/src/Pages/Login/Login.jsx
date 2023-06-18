import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import login from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
	const { signIn } = useContext(AuthContext);

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password)
			.then((result) => {
				const user = result.user;
				toast.success('Successfully logged  in');

				const currentUser = {
					email: user.email,
				};
				console.log(currentUser);

				// get jwt token
				fetch('https://genius-car-server-phi.vercel.app/jwt', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(currentUser),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						localStorage.setItem('genius-token', data.token);
						navigate(from, { replace: true });
					});
			})
			.catch((e) => {
				console.log(e);
				toast.error(e.message);
			});
	};

	return (
		<div className="hero w-full my-20 ">
			<div className="hero-content flex-col gap-10 lg:flex-row grid md:grid-cols-2">
				<div className="text-center lg:text-left ">
					<img src={login} alt="" className="w-3/4" />
				</div>
				<div className="card py-20 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form onSubmit={handleLogin} className="card-body">
						<h1 className="text-5xl text-center font-bold">Login now!</h1>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
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
								placeholder="password"
								name="password"
								className="input input-bordered"
							/>
							<label className="label">
								<p className="label-text-alt link link-hover">Forgot password?</p>
							</label>
						</div>
						<div className="form-control mt-6">
							<input className="btn btn-primary" type="submit" value="Login" />
						</div>
					</form>
					<SocialLogin/>
					<p className="text-center">
						New to Genius Car{' '}
						<Link className="text-orange-600 font-bold my-3" to={'/signup'}>
							Sign Up
						</Link>{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
