import React from 'react';

export const ClosedIcon: React.FC<{
  setShowModal(condition: boolean): void;
}> = ({ setShowModal }) => (
	<button
		className="flex justify-center items-center pt-2/3 ml-10 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
		onClick={() => setShowModal(false)}
	>
		<span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none hover:opacity-70 hover:scale-110 ease-linear transition-all duration-150">
			×
		</span>
	</button>
);
