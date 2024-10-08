"use client";
import next from "next";
import { ProfileName, Text } from "../texts";
import { BlueBtn, Exit, SmallButton } from "../button/index";
import { EditModal } from "../modal/editModal";
import { useState } from "react";

const ProfileInfo = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    < >
      <div className="w-[35%] max-sm:w-screen max-sm:flex max-sm:flex-col max-sm:justify-center h-[50%] rounded-2xlbg-[#050505] absolute">
        <img
          className=" w-screen h-[35%] max-sm:h-[60%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkqBtrIXtWRlH8-_PiILF6vcX4g35parF770can3nunijYw3g_"
          alt="Banner do perfil do usuário"
        />
        <Exit style={`max-sm:flex max-sm:justify-end  max-sm:gap-2 max-sm:mr-4 max-sm:pt-5 md:hidden`}/>

        <img
          className="relative -top-10 max-sm:-top-20 max-sm:z-45 mx-[40%] max-sm:mx-[40%] h-20 w-20 rounded-full ring-2  "
          src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
          alt="imagem de perfil do usuário logado"
        />

        <div className="max-sm:relative max-sm:-top-16 flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5 bg-neutral-background">
          <ProfileName
            fieldStyle="bg-neutral-background ml-[3%] max-sm:items-center"
            nameStyle="bg-neutral-background text-xl "
            nomeExibicao={"Fulano da Silva"}
            nomeUsuario={"@Fulano"}
          />
          

          <div className=" flex w-auto max-sm:w-[35%] h-[20%] bg-neutral-background gap-4 max-sm:flex-col max-sm:items-center">
            <SmallButton
              Style={"max-sm:items-center h-[5%] px-1 py-[0.75rem] "}
              Text={"Editar Perfil"}
              onClick={() => setIsModalOpen(true)}
            />

            <Exit style={`max-sm:hidden`}/>
          </div>
        </div>

        <div className="flex justify-between w-[40%] my-[5%] ml-[5%] max-sm:ml-[20%] bg-neutral-background gap-4">
          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">0</Text>
            <Text style="bg-neutral-background opacity-50">Seguidores</Text>
          </div>

          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">0</Text>
            <Text style="bg-neutral-background opacity-50">Likes</Text>
          </div>

          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">0</Text>
            <Text style="bg-neutral-background opacity-50">Posts</Text>
          </div>
        </div>
      </div>
      <EditModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </>
  );
};

export default ProfileInfo;
