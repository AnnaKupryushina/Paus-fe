import React from 'react';

export const FileContainer: React.FC<{
  title: string;
  accept: string;
  file: any;
  setVideoFile?(file: any): void;
  setImageFile?(file: any): void;
}> = ({ setVideoFile, setImageFile, file, title, accept }) => {
	const onFileChoose = (file: any) => {
		setImageFile && setImageFile(file);
		setVideoFile && setVideoFile(file);
	};

	return (
		<div className="m-4">
			<label className="inline-block mb-2 text-gray-500">{title}</label>
			<div className="flex items-center justify-center w-full">
				<label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
					<div className="flex flex-col items-center justify-center pt-7">
						{file ? (
							<p className="pt-5 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
								{file.name}
							</p>
						) : (
							<>
								<svg
									className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
								<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
									Attach a file
								</p>
							</>
						)}
					</div>
					<input
						onChange={(e) => e.target.files && onFileChoose(e.target.files[0])}
						accept={accept}
						type="file"
						className="opacity-0 file:mr-4 file:py-2 file:px-4
							file:rounded-full file:border-0
							file:text-sm file:font-semibold
							file:bg-violet-50 file:text-violet-700
							hover:file:bg-violet-100"
					/>
				</label>
			</div>
		</div>
	);
};
