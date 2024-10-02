"use client";
import React, { useState } from "react";
import profilePicture from "./../../../public/images/MessiProfilePicture.jpg";
import Image from "next/image";

export const EditModal = (props) => {
//   const [name, setName] = useState(userData.name);
//   const [description, setDescription] = useState(userData.description);
//   const [profileImage, setProfileImage] = useState(userData.profileImage);
//   const [userData, setUserData] = useState({
//     name: "John Doe",
//     description: "Desenvolvedor Full Stack",
//     profileImage: "/path/to/default/profile.jpg",
//   });

//   const handleSave = () => {
//     onSave({ name, description, profileImage });
//     onClose();
//   };

//   if (!isOpen) return null; // O modal só abre se isOpen for true

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black rounded-lg shadow-lg w-96 p-6 relative">
        <button  className="absolute top-2 right-2 text-xl">
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-primary-blue">Editar Perfil</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-blue">
            Nome
          </label>
          <input
            type="text"
            className="border w-full p-2 rounded mt-1"
            value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-blue">
            Descrição
          </label>
          <textarea
            className="border w-full p-2 rounded mt-1"
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-blue">
            Foto de Perfil
          </label>
          <div className="flex items-center gap-3">
            <Image
              src={profilePicture}
              width={50}
              height={50}
              alt="Profile Image"
              className="rounded-full"
            />
            <input
              type="file"
            //   onChange={(e) =>
            //     setProfileImage(URL.createObjectURL(e.target.files[0]))
            //   }
            />
          </div>
        </div>

        <button
        //   onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};
