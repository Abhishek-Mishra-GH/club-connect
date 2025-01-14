'use client'

import React, { MouseEvent } from "react";

interface LoadingButtonProps {
  label: string; // Default button text
  isLoading?: boolean; // Optional: external control for loading state
  disabled?: boolean; // Optional: disable the button
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      type="submit" // Ensure it's a submit button for the form
      className={`relative flex items-center justify-center px-6 py-2 text-white bg-cyan-600 rounded-md shadow-md hover:bg-cyan-700 ${
        isLoading || disabled ? "cursor-not-allowed opacity-70" : ""
      }`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
        label
      )}
    </button>
  );
};

export default LoadingButton;
