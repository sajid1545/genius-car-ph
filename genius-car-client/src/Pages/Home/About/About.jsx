import React from 'react';
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
	return (
		<div>
			<div className="hero my-20">
				<div className="hero-content flex-col lg:flex-row">
					<div className="w-1/2 relative">
						<img src={person} className="w-4/5 h-full rounded-lg  shadow-2xl" alt="about_us" />
						<img src={parts} className="absolute right-5 top-1/2 w-3/5 rounded-lg border-8 shadow-2xl" alt="about_us" />
					</div>
					<div className="w-1/2">
						<p className="text-2xl text-[#FF3811] font-bold mb-5">About Us</p>
						<h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
						<p className="py-6">
							There are many variations of passages of Lorem Ipsum available, but the majority have
							suffered alteration in some form, by injected humour, or randomised words which don't
							look even slightly believable.
						</p>
						<p className="py-6">
							There are many variations of passages of Lorem Ipsum available, but the majority have
							suffered alteration in some form, by injected humour, or randomised words which don't
							look even slightly believable.
						</p>
						<button className="btn bg-[#FF3811] border-0">Get More Info</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
