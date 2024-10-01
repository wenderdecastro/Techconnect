import next from "next";
import {ProfileName, Text}  from "../texts";

export const Post = () => {
  return (
    <section className="w-[35%] h-3/5 px-5 py-5 flex flex-col gap-7 bg-neutral-lighter_gray">
      {/* user infos */}
      <div className="h-5 w-80 flex flex-row">
        <img
          className="w-16 rounded size-12"
          src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
          alt="imagem de perfil do usuário logado"
        />
        <ProfileName nomeExibicao={"Fulano da Silva"} nomeUsuario={"@Fulano"}/>
      </div>

      {/* post content */}
      <div className="">
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, quod!
          Delectus maiores praesentium aspernatur, sequi aperiam voluptatibus
          ipsa quo. Consequuntur maiores ipsa ratione quod? Fuga aliquid illo
          iure sint quia.
        </Text>
      </div>

      {/* likes-comentarios */}
      <div className=""></div>
    </section>
  );
};
