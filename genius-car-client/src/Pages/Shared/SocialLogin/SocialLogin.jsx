import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { setAuthToken } from './../../../api/auth';

const SocialLogin = () => {
	const { googleSignIn } = useContext(AuthContext);

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	const handleGoogleSignIn = () => {
		googleSignIn()
			.then((result) => {
				const user = result.user;
				console.log(user);

				setAuthToken(user);
				navigate(from, { replace: true });
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<small className="text-center">social login</small>
			<p className="text-center">
				<button onClick={handleGoogleSignIn} className="btn btn-ghost">
					Google
				</button>
			</p>
		</div>
	);
};

export default SocialLogin;
