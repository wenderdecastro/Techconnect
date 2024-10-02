import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ images, currentIndex, onClose }) => {
    const handlePrev = () => {
        if (currentIndex > 0) {
            onChangeIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            onChangeIndex(currentIndex + 1);
        }
    };

    const [index, setIndex] = useState(currentIndex);

    const onChangeIndex = (newIndex) => {
        setIndex(newIndex);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80">
            <div className="relative flex w-full h-full p-4">
                <button onClick={onClose} className="absolute p-16 text-2xl text-white top-2 right-2">
                    <FaTimes />
                </button>

                <button onClick={handlePrev} disabled={index === 0} className="w-1/4 p-16 text-left text-white">
                    Previous
                </button>
                <img className="object-contain w-2/4 h-auto rounded-lg" src={images[0]} alt={`Image ${index + 1}`} />

                <button onClick={handleNext} disabled={index === images.length - 1} className="w-1/4 p-16 text-right text-white">
                    Next
                </button>
            </div>
        </div>
    );
};

export default ImageModal;