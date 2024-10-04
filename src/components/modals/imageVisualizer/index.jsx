import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ images, currentIndex, onClose }) => {
    const [index, setIndex] = useState(currentIndex);

    useEffect(() => {
        setIndex(currentIndex);
        console.log(index);
        console.log(currentIndex);

        // Update the modal's index when a new image is clicked
    }, [currentIndex]);

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleNext = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80">
            <div className="relative flex w-full h-full p-4">
                <button onClick={onClose} className="absolute p-16 text-2xl text-white top-2 right-2">
                    <FaTimes />
                </button>

                <button onClick={handlePrev} disabled={index === 0} className="w-1/4 p-16 text-left text-white">
                    {index === 0 ? "" : "Previous"}
                </button>

                <img className="object-contain w-2/4 h-auto rounded-lg" src={images[index]} alt={`Image ${index + 1}`} />

                <button onClick={handleNext} disabled={index === images.length - 1} className="w-1/4 p-16 text-right text-white">
                    {index === images.length - 1 ? "" : "Next"}
                </button>
            </div>
        </div >
    );
};

export default ImageModal;
