import next from "next";

import { ProfileName, Text } from "../texts";
import { BlueBtn, Exit } from "../button/index";
import { EditModal } from "../modal/editModal";
import { useState } from "react";

const ProfileInfo = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="  bg-gray-900 flex justify-center w-screen h-screen">
      <div className="w-[45%] h-[60%] my-[5%] rounded-2xl bg-neutral-background absolute">
        <img
          className="w-screen h-[35%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkqBtrIXtWRlH8-_PiILF6vcX4g35parF770can3nunijYw3g_"
          alt="Banner do perfil do usuário"
        />

        <img
          className="relative -top-10  ml-[45%] h-20 w-20 rounded-full ring-2  "
          src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
          alt="imagem de perfil do usuário logado"
        />

        <div className="flex justify-between bg-neutral-background">
          <ProfileName
            fieldStyle="bg-neutral-background ml-[3%]"
            nameStyle="bg-neutral-background text-lg "
            nomeExibicao={"Fulano da Silva"}
            nomeUsuario={"@Fulano"}
          />

          <div className=" flex w-[30%] h-[15%]  bg-neutral-background">
            <BlueBtn
              style={"mr-[10%] h-[5%] px-1 py-1 "}
              text={"Editar Perfil"}
              onclick={() => setIsModalOpen(true)}
            />

            <Exit />
          </div>
        </div>

        <div className="flex justify-between w-[40%] my-[5%] ml-[5%] bg-neutral-background">
          <Text style="bg-neutral-background ">0</Text>
          <Text style="bg-neutral-background opacity-50">Seguidores</Text>
          <Text style="bg-neutral-background ">0</Text>
          <Text style="bg-neutral-background opacity-50">Likes</Text>
          <Text style="bg-neutral-background ">0</Text>
          <Text style="bg-neutral-background opacity-50">Posts</Text>
        </div>
      </div>
      <EditModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </div>
  );
};

export default ProfileInfo;
