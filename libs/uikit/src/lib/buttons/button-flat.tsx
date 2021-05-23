import React from 'react'

interface ButtonFlatProps {
    text: string
}

export const ButtonFlat: React.FC<ButtonFlatProps> = ({ text }) => {
    return (
        <button
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
        >
            {text}
        </button>
    )
}
