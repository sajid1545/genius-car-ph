import React from 'react';

const ProductCard = ({ product }) => {
	const { title, picture, price } = product;

	return (
		<div>
			<div className="card card-compact w-[350px] mx-auto bg-base-100 shadow-xl text-center p-6">
				<figure className="rounded-lg bg-[#F3F3F3] ">
					<img src={picture} className="rounded-xl  h-[150px] p-8" alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="text-2xl font-bold text-center">{title}</h2>

					<p className="text-[#FF3811] font-semibold text-2xl">${price}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
