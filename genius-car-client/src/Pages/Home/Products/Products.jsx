import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('products.json')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<div className="">
			<div className="text-center space-y-5 ">
				<p className="text-2xl text-orange-600 font-bold">Popular Products</p>
				<h2 className="text-5xl font-semibold">Browse Our Products</h2>
				<p className="text-[#737373]">
					the majority have suffered alteration in some form, by injected humour, or randomized
					words which don't look even slightly believable.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Products;
