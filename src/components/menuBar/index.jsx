import next from "next";
import Image from "next/image";
import logoImg from "./../../../public/images/AppLogo.png";
import Link from "next/link";

const MenuBar = () => {
  return (
    <div class="w-1/3 h-screen bg-black border-red-700 border-2 px-10 py-2 flex justify-between flex-col">
      <aside class="flex flex-col gap-5">
        <Image src={logoImg} width={100} height={100} alt="Imagem do logo" />

        <div class="flex flex-col gap-3">
          <div class=" border-r-2 border-[#74BDE8] bg-white bg-opacity-5 h-12 flex items-center">
            <Link class="text-white w-auto" href="">
              {" "}
              Feed{" "}
            </Link>
          </div>
          <div>
            <Link class="text-white w-auto" href="">
              {" "}
              Comunidade{" "}
            </Link>
          </div>
          <div>
            <Link class="text-white w-auto" href="">
              {" "}
              Perfil{" "}
            </Link>
          </div>
        </div>
      </aside>

      <div>
        <Image src={logoImg} width={30} height={30} alt="Imagem do logo" />
      </div>
    </div>
  );
};

export default MenuBar;
