"use client";
import React, { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
// import { PostInput } from "../input";
import { Link, SmallButton } from "../button";
import { Text } from "../texts";

export const EditModal = ({
  isOpen,
  onClose,
  setUserData,
  updateProfile,
  name,
  nameUser,
  profilePicture,
  bannerPicture,
}) => {
  const [nomeExibicao, setNomeExibicao] = useState(name);
  const [nomeUsuario, setNomeUsuario] = useState(nameUser);
  const [fotoPerfil, setFotoPerfil] = useState(profilePicture);
  const [fotoBanner, setFotoBanner] = useState(bannerPicture);

  const handleSave = async () => {
    // Atualiza os dados do perfil
    
    // setUserData(updatedUserData);
    // updateProfile(updatedUserData); // Passa os dados atualizados para a função updateProfile
    
    const usuarioLogadoObj = JSON.parse(updateProfile);
    console.log(usuarioLogadoObj.ID);
    const updatedUserData = {
      NomeExibicao: nomeExibicao,
      NomeUsuario: nomeUsuario,
      FotoPerfilURL: fotoPerfil,
      FotoBannerURL: fotoBanner,
    };
  
    const response = await fetch(`http://localhost:3000/Usuario/${usuarioLogadoObj.ID}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedUser = await response.json();
    console.log("Perfil atualizado com sucesso:", updatedUser);
    onClose(); // Fecha o modal após salvar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form className="flex flex-col items-center justify-center w-[50%] h-fit rounded-2xl">
        <div className="w-[50%] flex flex-col gap-5 py-16">
          <Text style="text-3xl">Editar Perfil</Text>

          <textarea
            placeholder="Nome Exibição..."
            className="w-full p-4 text-sm bg-neutral-lighter_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue"
            value={nomeExibicao}
            onChange={(e) => setNomeExibicao(e.target.value)}
            rows={1}
          />
          <textarea
            placeholder="@Username..."
            className="w-full p-4 text-sm bg-neutral-lighter_gray rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-blue"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            rows={1}
          />

          <div className="flex items-center justify-between">
            {/* Editar Foto de perfil e banner */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3">
                <input
                  type="file"
                  accept="image/*"
                  id="bannerUpload"
                  className="hidden"
                  onChange={(e) =>
                    setFotoBanner(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <label htmlFor="bannerUpload" className="cursor-pointer">
                  <img src={fotoBanner} className="w-6 h-6" alt="Banner" />
                </label>
                <p>Banner</p>
              </div>
              <div className="flex flex-row gap-3">
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  className="hidden"
                  onChange={(e) =>
                    setFotoPerfil(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <label htmlFor="profileUpload" className="cursor-pointer">
                  <CgProfile className="w-6 h-6" />
                </label>
                <p>Foto de Perfil</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3">
              <SmallButton Text={"Salvar"} onClick={() => handleSave()} />
              <Link Text={"Cancelar"} onClick={() => onClose(false)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

