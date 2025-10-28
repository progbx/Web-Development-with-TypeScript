import React from "react";

const Card: React.FC = () => {
    return (
        <div className="bg-blue-500 rounded shadow p-5">
            <img
                src="src/public/product-card.webp"
                alt="car product image"
                className="h-48 w-full object-cover md:w-48"
            />
            <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Super Car For Sale
            </h2>
            <p className="mt-2 text-gray-500">
                The 2024 Luxo Sedan combines a sleek design with premium leather interiors and a cutting-edge infotainment system. Its turbocharged engine offers a blend of performance and efficiency, while advanced safety features ensure a secure ride.
            </p>
            <button className="mt-5 px-4 py-1 border border-blue-500 text-blue-500 rounded duration-300 hover:bg-blue-500 hover:text-white">
                Buy This Car Now
            </button>
        </div>
    );
};

export default Card;
