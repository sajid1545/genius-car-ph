import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
	const [services, setServices] = useState([]);

	const [isAsc, setIsAsc] = useState(true);
	const [search,setSearch] = useState('');

	const searchRef = useRef()

	useEffect(() => {
		fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
			.then((res) => res.json())
			.then((data) => setServices(data));
	}, [isAsc,search]);


	const handleSearch = () => {
		setSearch(searchRef.current.value);
	}


	return (
		<div className="">
			<div className="text-center space-y-5">
				<p className="text-2xl text-orange-600 font-bold">Services</p>
				<h2 className="text-5xl font-semibold">Our Service Area</h2>
				<p className="text-[#737373]">
					The majority have suffered alteration in some form, by injected humour, or randomised
					words which don't look even slightly believable.{' '}
				</p>
				
				<input ref={searchRef} className='input input-sm' type="text" placeholder='serach' /><button className='btn' onClick={handleSearch}>Search</button>
				<button className='btn btn-primary' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
				{services.map((service) => (
					<ServiceCard key={service._id} service={service} />
				))}
			</div>
		</div>
	);
};

export default Services;
