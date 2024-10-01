"use client";
import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import Link from "next/link";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Menu_textProfile } from "../text";

const MenuBar = () => {
  //useState para verficar se está selecionado ou não
  const [isClicked, setIsClicked] = useState("");

  return (
    <div class="w-1/3 h-screen bg-black py-2 flex justify-between flex-col">
      <aside class="flex flex-col gap-5">
        <Image src={logoImg} width={100} height={100} alt="Imagem do logo" />

        <section class="flex flex-col gap-3 pr-10">
          <div
            // Aqui a gente seleciona pelo título da página, dessa forma ao clicar ná página ele não seleciona todos
            onClick={() => setIsClicked("feed")}
            class={
              // Se o useState está setado com o título da página ele ativa o 'CSS' dele caso não, deixa como o estilo padrão
              isClicked === "feed"
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center `
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
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center`
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
                ? `border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-16 flex items-center`
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
      <section class=" w-full pl-20 py-10 ">
        <div class=" flex flex-row border-[#74BDE8] border-2 w-5/6 h-full rounded-2xl bg-white bg-opacity-5 justify-between px-3 py-3">
          <div className="flex flex-row gap-2">
            <Image
              src={logoImg}
              width={50}
              height={50}
              alt="Imagem de perfil"
              class="rounded-full "
            />
            <div class="flex-col flex gap-2">
              <Menu_textProfile styles="text-white">NoNameUser</Menu_textProfile>

              <Menu_textProfile styles="text-gray-500"> @NoNameUser</Menu_textProfile>
            </div>
          </div>

          <FiLogOut class="" />
        </div>
      </section>
    </div>
  );
};

export default MenuBar;
