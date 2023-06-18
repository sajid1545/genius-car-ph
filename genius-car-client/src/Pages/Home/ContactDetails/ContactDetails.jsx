import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';

const ContactDetails = () => {
	return (
		<div className="bg-[#151515] py-24 px-[76px] my-10 text-white rounded-xl">
			<div className="grid grid-cols-3 gap-5">
				<div className="flex items-center gap-4">
					<div>
						<CiCalendarDate className="w-11 h-11  text-orange-600" />
					</div>
					<div>
						<p>We are open monday-friday</p>
						<h2 className="text-2xl font-bold">7:00 am - 9:00 pm</h2>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div>
						<BiPhoneCall className="w-10 h-10 text-orange-600" />
					</div>
					<div>
						<p>Have a question?</p>
						<h2 className="text-2xl font-bold">+2546 251 2658</h2>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div>
						{/* <CiLocationOn className="w-10 h-10 text-orange-600" /> */}
					</div>
					<div>
						<p>Need a repair? our address</p>
						<h2 className="text-2xl font-bold">Liza Street, New York</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
