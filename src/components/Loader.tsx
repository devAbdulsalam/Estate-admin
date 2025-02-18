import React from 'react';

const Loader = () => {
	return (
		<section className="absolute top-0 z-10 left-0 w-full h-screen bg-white/50 flex items-center justify-center overflow-y-scroll">
			<span className="loader2"></span>
		</section>
	);
};

export default Loader;
