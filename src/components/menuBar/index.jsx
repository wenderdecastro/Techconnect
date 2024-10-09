"use client";
import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import profilePicture from "./../../../public/images/MessiProfilePicture.jpg";
import Link from "next/link";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Menu_textProfile } from "../text";
import { ProfileName } from "../texts";
<<<<<<< HEAD
import { IsAuthenticated } from "@/utils/authentication";
import { SmallButton } from "../button";
import { PostModal } from "../postInput";
=======
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
>>>>>>> 6557b773e0fbf35bc9b018a603a229c593b3f143

const MenuBar = ({ selected, NomeExibicao, NomeUsuario, FotoPerfilURL, onLogOut }) => {
  //useState para verficar se está selecionado ou não
  const [isClicked, setIsClicked] = useState(selected);
  const [isAuthenticated, setIsAuthenticated] = useState(IsAuthenticated())



  return (
    <div className="flex flex-col justify-between h-[97.5%] py-2 ">
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

      {/* Perfil */}
      <section class=" w-3/4 py-12">
        <div class=" flex flex-row items-center border-[#74BDE8] border-2 w-full h-full rounded-2xl bg-white bg-opacity-5 gap-3 p-4">
          <div className="">
            {FotoPerfilURL ? (
              <Image
                src={FotoPerfilURL}
                width={75}
                height={75}
                alt="Imagem de perfil"
                className="h-full rounded-full cursor-pointer aspect-square"
              />

            ) : (
              <FaUser />
            )}
          </div>
          <div class="flex-col flex gap-1 w-full">
            <ProfileName fieldStyle={"gap-0"} nomeExibicao={NomeExibicao} nomeUsuario={NomeUsuario} userStyle="w-auto" />
          </div>
          <div class=" flex flex-col justify-center pr-5 cursor-pointer" onClick={onLogOut}>
            <FiLogOut class="w-6 h-6" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuBar;
