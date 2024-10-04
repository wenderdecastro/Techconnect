"use client";
import React, { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { PostInput } from "../input";
import { Link, SmallButton } from "../button";
import { Text } from "../texts";

export const EditModal = ({
  text,
  onChange,
  onSubmit,
  onImagesSelected,
  isOpen,
  onClose,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const textareaRef = useRef(null); // Create a ref for the textarea

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length > 10) {
      alert("Você não pode postar mais de 10 imagens no mesmo post.");
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
      const updatedImages = prevImages.filter(
        (image) => image !== imageToRemove
      );
      onImagesSelected(updatedImages);
      return updatedImages;
    });
  };

  const handleSubmit = () => {
    e.preventDefault();
    setSelectedImages([]);
    onSubmit();
    text = "";
  };

  // Function to handle textarea resizing
  const handleInput = () => {
    textareaRef.current.style.height = "auto"; // Reset height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
  };

  if (!isOpen) return null; // O modal só abre se isOpen for true

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[50%] h-fit rounded-2xl "
      >
        <div className="w-[50%] flex flex-col gap-5 py-16 ">
          <Text style="text-3xl"> Editar Perfil </Text>

          <textarea
            ref={textareaRef} // Attach the ref
            placeholder="Nome Exibição..."
            className="w-full p-4 text-sm border-0 resize-none bg-neutral-lighter_gray border-neutral-lightest_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue placeholder-neutral-light_gray"
            value={text}
            onChange={onChange}
            onInput={handleInput}
            rows={1}
          />
          <textarea
            ref={textareaRef} // Attach the ref
            placeholder="@Username..."
            className="w-full p-4 text-sm border-0 resize-none bg-neutral-lighter_gray border-neutral-lightest_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue placeholder-neutral-light_gray"
            value={text}
            onChange={onChange}
            onInput={handleInput}
            rows={1}
          />
          <textarea
            ref={textareaRef} // Attach the ref
            placeholder="Bio..."
            className="w-full p-4 text-sm border-0 resize-none bg-neutral-lighter_gray border-neutral-lightest_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue placeholder-neutral-light_gray"
            value={text}
            onChange={onChange}
            onInput={handleInput}
            rows={3}
          />
          <div className="flex items-center justify-between">
            {/* Editar Foto de perfil */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3">
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
                    <img
                      src="/icons/images.png"
                      className="w-6 h-6 aspect-square"
                      alt="Upload"
                    />
                  )}
                </label>

                <p>Banner</p>
              </div>
              <div className="flex flex-row gap-3">
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
                    <CgProfile className="w-6 h-6 aspect-square" alt="Upload" />
                  )}
                </label>

                <p>Foto de Perfil</p>
              </div>
            </div>

            <div className="flex flex-row  items-center gap-3 ">
              <SmallButton Text={"Salvar"} Inverse={true} Style={'border-2'}/>
              <Link Text={"Cancelar"} 
              Style={'text-opacity-75'}
              onClick={() => onClose(false)} />
            </div>
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
    </div>
  );
};
