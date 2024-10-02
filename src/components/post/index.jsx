import next from "next";
import { FaRegClock } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { ProfileName, Text } from "../texts";
import { PostButton } from "../postButton";
import Image from "next/image";

export const Post = (props) => {
  const imageLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <article className="w-[85%] h-fit px-5 py-5 flex flex-col justify-between rounded-2xl bg-neutral-900 bg-opacity-50 dev">
      {/* user infos */}
      <div className="h-[10%] w-[100%] flex">
        <img
          className="w-16 rounded-full size-16"
          src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
          alt="imagem de perfil do usuário logado"
        />
        <ProfileName nomeExibicao={"Fulano da Silva"} nomeUsuario={"@Fulano"} />

        <span className="flex gap-2 py-1 text-sm text-center opacity-50 ">
          <FaRegClock style={{ scale: "130%", paddingTop: "2.5%" }} />
          32 seg atras
        </span>

        <PostButton fieldStyle="w-[25%] ">
          <FiTrash style={{ scale: "130%", paddingTop: "2%" }} />
          Deletar
        </PostButton>
      </div>

      {/* post content */}
      <div className="w">
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, quod!
          Delectus maiores praesentium aspernatur, sequi aperiam voluptatibus
          ipsa quo. Consequuntur maiores ipsa ratione quod? Fuga aliquid illo
          iure sint quia.
        </Text>

        <div className="w-[70%] h-[70%]">
          <img
            className="w-[60%] h-[70%] rounded-2xl"
            src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
            alt="imagem de perfil do usuário logado"
          />
        </div>
      </div>

      {/* likes-comentarios */}
      <div className="flex w-[80%] gap-5 ">
        <PostButton fieldStyle="w-[25%]">
          <FaRegHeart style={{ scale: "150%", paddingTop: "5%" }} />
          Curtir
        </PostButton>

        <PostButton fieldStyle="w-[45%]">
          <FaRegComment style={{ scale: "150%", paddingTop: "1%" }} />
          777 Comentarios
        </PostButton>
      </div>
    </article>
  );
};
