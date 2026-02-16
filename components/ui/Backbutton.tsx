import React from "react";

interface ButtonProps {
  label?: string;
}

const Button: React.FC<ButtonProps> = ({ label = "Go Back" }) => {
  return (
    <div
      role="button"
      aria-label={label}
      className="bg-white w-48 h-14 rounded-2xl relative text-xl font-semibold group cursor-pointer overflow-hidden select-none"
    >
      {/* Sliding icon container */}
      <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 transition-all duration-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          width="25"
          height="25"
        >
          <path
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            fill="#000000"
          />
          <path
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="translate-x-2 leading-[56px] text-center text-black">
        {label}
      </p>
    </div>
  );
};

export default Button;
