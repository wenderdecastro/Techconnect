"use client";
import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import profilePicture from "./../../../public/images/MessiProfilePicture.jpg";
import Link from "next/link";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { ProfileName } from "../texts";

const MenuBar = () => {
  //useState para verficar se está selecionado ou não
  const [isClicked, setIsClicked] = useState("");

  return (
    <div class=" h-5/6 py-2 flex flex-col justify-between ">
      <aside class="flex flex-col gap-5">
        {/* <Image src={logoImg} width={100} height={100} alt="Imagem do logo" /> */}

        <section class="flex flex-col gap-3">
          <div
            // Aqui a gente seleciona pelo título da página, dessa forma ao clicar ná página ele não seleciona todos
            onClick={() => setIsClicked("feed")}
            class={
              // Se o useState está setado com o título da página ele ativa o 'CSS' dele caso não, deixa como o estilo padrão
              isClicked === "feed"
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center w-5/6 `
                : `flex items-center`
            }
          >
            <Link
              class={
                isClicked === "feed"
                  ? `text-[#74BDE8] w-auto px-10`
                  : `text-white w-auto px-10`
              }
              href=""
            >
              {" "}
              Feed{" "}
            </Link>
          </div>

          <div
            onClick={() => setIsClicked("comunidade")}
            class={
              isClicked === "comunidade"
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center w-5/6`
                : `flex items-center`
            }
          >
            <Link
              class={
                isClicked === "comunidade"
                  ? `text-[#74BDE8] w-auto px-10`
                  : `text-white w-auto px-10`
              }
              href=""
            >
              {" "}
              Comunidade{" "}
            </Link>
          </div>
          <div
            onClick={() => setIsClicked("perfil")}
            class={
              isClicked === "perfil"
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center w-5/6`
                : `flex items-center`
            }
          >
            <Link
              class={
                isClicked === "perfil"
                  ? `text-[#74BDE8] w-auto px-10`
                  : `text-white w-auto px-10`
              }
              href=""
            >
              {" "}
              Perfil{" "}
            </Link>
          </div>
        </section>
      </aside>

      {/* Perfil */}
      <section class=" w-3/4 py-12">
        <div class=" flex flex-row items-center border-[#74BDE8] border-2 w-4/4 h-full rounded-2xl bg-white bg-opacity-5 justify-between py-3">
          <div className="flex flex-row gap-2 pl-2">
            <Image
              src={profilePicture}
              width={50}
              height={50}
              alt="Imagem de perfil"
              class="  aspect-square rounded-full cursor-pointer "
            />
            <div class="flex-col flex gap-1">
              <ProfileName nomeExibicao={"Fulano da Silva"} nomeUsuario={"@Fulano"} userStyle="w-auto"/>
            </div>
          </div>

          <div class=" flex flex-col justify-center pr-5 cursor-pointer">
            <FiLogOut class="w-6 h-6" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuBar;
