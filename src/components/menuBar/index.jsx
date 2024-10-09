"use client";
import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { ProfileName } from "../texts";
import { IsAuthenticated, getUser } from "@/utils/authentication";
import { SmallButton } from "../button";
import { PostModal } from "../postInput";

const MenuBar = ({ selected, name, nameUser, profilePicture,  }) => {
  //useState para verficar se está selecionado ou não
  const [isClicked, setIsClicked] = useState(selected);
  const [isAuthenticated, setIsAuthenticated] = useState(IsAuthenticated())
  const [userData, setUserData] = useState({
    userId: "",
    nomeExibicao: "",
    nomeUsuario: "",
    fotoUrlPerfil: "",
    FotoBannerURL: "",
  });
  
  const gotUserData = async () => {
    const usuarioLogado = getUser();

    if (usuarioLogado) {
      // Verifica se o dado está em formato de string JSON e o converte
      const usuarioLogadoObj = await JSON.parse(usuarioLogado);

      console.log("Usuário logado:", usuarioLogadoObj.ID);
      setUserData({
        userId: usuarioLogadoObj.ID,
        nomeExibicao: usuarioLogadoObj.NomeExibicao,
        nomeUsuario: usuarioLogadoObj.NomeUsuario,
        fotoUrlPerfil: usuarioLogadoObj.FotoPerfilURL,
        FotoBannerURL: usuarioLogadoObj.FotoBannerURL,
      });
    } else {
      console.log("Nenhum usuário logado.");
    }
  };


  useEffect(() => {
    gotUserData();
  
  }, []);
  return (
    <>
      <div className="flex flex-col justify-between h-full py-2 max-sm:hidden">
        <aside className="flex flex-col gap-5">
          {/* <Image src={logoImg} width={100} height={100} alt="Imagem do logo" /> */}

          <section className="flex flex-col gap-3">
            <div
              // Aqui a gente seleciona pelo título da página, dessa forma ao clicar ná página ele não seleciona todos
              onClick={() => setIsClicked("feed")}
              className={
                // Se o useState está setado com o título da página ele ativa o 'CSS' dele caso não, deixa como o estilo padrão
                isClicked === "feed"
                  ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center w-5/6 `
                  : `flex items-center`
              }
            >
              <Link
                className={
                  isClicked === "feed"
                    ? `text-[#74BDE8] w-auto px-10`
                    : `text-white w-auto px-10`
                }
                href="/home"
              >
                {" "}
                Feed{" "}
              </Link>
            </div>

            {isAuthenticated ? (<div
              onClick={() => setIsClicked("perfil")}
              className={
                isClicked === "perfil"
                  ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center w-5/6`
                  : `flex items-center`
              }
            >
              <Link
                className={
                  isClicked === "perfil"
                    ? `text-[#74BDE8] w-auto px-10`
                    : `text-white w-auto px-10`
                }
                href="/profile"
              >
                {" "}
                Perfil{" "}
              </Link>
            </div>) : (<></>)}


          </section>
        </aside>
        {/* <SmallButton Text={"Postar"} onClick={() => setIsModalOpen(!isModalOpen)} Style={"w-2/6 h-12  "} /> */}

      {isAuthenticated ? (<section className="w-3/4 py-12 ">
        <div className=" flex flex-row items-center border-[#74BDE8] border-2 w-full h-full rounded-2xl bg-white bg-opacity-5 gap-3 p-4">
          <div className="">
            <img
              src={userData.fotoUrlPerfil}
              alt="Imagem de perfil"
              className="h-full rounded-full cursor-pointer aspect-square"
            />



            </div>
          <div className="flex flex-col w-full gap-1">
            <ProfileName fieldStyle={"gap-0"} nomeExibicao={userData.nomeExibicao} nomeUsuario={`@ ${userData.nomeUsuario}`} userStyle="w-auto" />
          </div>
          <div className="flex flex-col justify-center pr-5 cursor-pointer ">
            <FiLogOut className="w-6 h-6" />
          </div>
        </div>
      </section>) : (<></>)}
      {/* Perfil */}

      </div>
    </>
  );
};

export default MenuBar;
