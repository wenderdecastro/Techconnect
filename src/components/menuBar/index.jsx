"use client";
import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import Link from "next/link";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const MenuBar = () => {
  //useState para verficar se está selecionado ou não
  const [isClicked, setIsClicked] = useState("");

  return (
    <div class="w-1/3 h-screen bg-black border-red-700 border-2 pr-10 py-2 flex justify-between flex-col">
      <aside class="flex flex-col gap-5">
        <Image src={logoImg} width={100} height={100} alt="Imagem do logo" />

        <section class="flex flex-col gap-3">
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

      <div>
        <Image />

        <div>
          <p></p>
        </div>

        <div>
          <p></p>
        </div>

        <FiLogOut />

      </div>
    </div>
  );
};

export default MenuBar;
