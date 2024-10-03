"use client";

import { LargeButton, SmallButton } from "../button";
import React, { useState, useRef } from "react";

export function PostInput({ text, onChange, onSubmit, onImagesSelected }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const textareaRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (selectedImages.length > 10) {
            alert('Você não pode postar mais de 10 imagens no mesmo post.');
            return;
        }

        setSelectedImages((prevImages) => {
            const updatedImages = [...prevImages, ...files];
            onImagesSelected(updatedImages);
            return updatedImages;
        });
    };


    const handleRemoveImage = (imageToRemove) => {
        console.log("Removing:", imageToRemove);
        setSelectedImages((prevImages) => {
            const updatedImages = prevImages.filter((image) => image !== imageToRemove);
            onImagesSelected(updatedImages);
            return updatedImages;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
        setSelectedImages([]);
        text = "";
    }

    const handleInput = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[90%] h-fit rounded-2xl bg-neutral-gray">
            <div className="w-[92.5%] flex flex-col gap-4 py-6">
                <textarea
                    ref={textareaRef} // Attach the ref
                    placeholder="No que está pensando?"
                    className="w-full p-4 text-sm border-0 resize-none bg-neutral-lighter_gray border-neutral-lightest_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue placeholder-neutral-light_gray"
                    value={text}
                    onChange={onChange}
                    onInput={handleInput}
                    rows={3}
                />
                <div className="flex items-center justify-between">
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        {selectedImages.length >= 10 ? null : (
                            <img src="/icons/images.png" className="w-6 h-6 aspect-square" alt="Upload" />
                        )}
                    </label>
                    <SmallButton Text={"Publicar"} />
                </div>

                {selectedImages.length > 0 && (
                    <div className="flex w-full gap-5 overflow-x-auto">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <div className="relative flex w-12 h-12 group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Selected ${index}`}
                                        className="object-cover w-full h-full transition duration-300 ease-in-out transform rounded-lg group-hover:bg-primary-red"
                                    />
                                    <div
                                        className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white transition-opacity duration-300 ease-in-out rounded-lg opacity-0 cursor-pointer group-hover:opacity-100 bg-primary-red"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage(image);
                                        }}
                                    >
                                        ✕
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
