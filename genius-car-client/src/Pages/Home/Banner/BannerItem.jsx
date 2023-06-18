import React from 'react';
import './BannerItem.css'


const BannerItem = ({ slide }) => {
	const { image, prev, next, id } = slide;

	return (
		<div id={`slide${id}`} className="carousel-item relative w-full">
			<div className="carousel-img">
				<img src={image} className="w-full h-fit rounded-xl" alt="bannerImg" />
			</div>
			<div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
				<h1 className="text-6xl font-bold text-white">
					Affordable <br />
					Price for Car <br />
					Servicing
                </h1>
                {/* <button className="btn btn-outline btn-warning">Warning</button>
                <button className="btn btn-outline btn-warning">Warning</button>     */}
			</div>
			<div className="absolute space-x-6 transform -translate-y-1/2  right-5 bottom-7">
				<a href={`#slide${prev}`} className="btn btn-circle">
					❮
				</a>
				<a href={`#slide${next}`} className="btn btn-circle">
					❯
				</a>
			</div>
		</div>
	);
};

export default BannerItem;
