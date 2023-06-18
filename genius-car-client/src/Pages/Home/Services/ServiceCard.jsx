import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
	const { title, img, price,_id } = service;

	return (
		<div>
			<div className="card card-compact w-96 bg-base-100 shadow-xl">
				<figure className="p-6">
					<img src={img} className="rounded-xl h-[200px]  " alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{title}</h2>

					<div className="flex justify-between items-center">
						<p className="text-[#FF3811] font-semibold text-2xl">Price : ${price}</p>

						<Link to={`checkout/${_id}`}>
							<FaArrowRight className="w-6 h-6 text-[#FF3811]  duration-500 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring" />
							{/* <button className='btn btn-primary'>Buy</button> */}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
