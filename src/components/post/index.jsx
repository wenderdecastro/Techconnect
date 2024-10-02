import next from "next";
import { FaRegClock } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { ProfileName, Text } from "../texts";
import { PostButton } from "../postButton";
import Image from "next/image";
import moment from "moment";
import ImageModal from "../modals/imageVisualizer";
import { useState } from "react";

export const Post = ({ id, date, userId, text, imagesURL, encadeado, viewImages }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (

    <>

      <article className="flex flex-col justify-between w-full gap-10 px-5 py-5 h-fit rounded-2xl bg-neutral-gray">

        {/* user infos */}

        <div className="h-[10%] w-[100%] flex gap-2">
          <img
            className="w-16 rounded-full size-16"
            src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
            alt="imagem de perfil do usuário logado"
          />


          <ProfileName nomeExibicao={"Fulano da Silva"} nomeUsuario={"@Fulano"} />

          <span className="flex gap-2 text-sm text-center opacity-50 ">
            <FaRegClock style={{ scale: "130%", paddingTop: "4.5%" }} />
            {moment(date).fromNow()}
          </span>

          {/* <PostButton fieldStyle="w-[25%] ">
    <FiTrash style={{ scale: "130%", paddingTop: "2%" }} />
    Deletar
  </PostButton> */}
        </div>

        {/* post content */}
        <div className="flex flex-col gap-4">
          <Text>{text}</Text>

          {imagesURL.length > 0 && (
            <>
              {imagesURL.length === 1 ? (
                <ImageDisplay openModal={openModal} src={imagesURL[0]} />
              ) : imagesURL.length === 2 ? (
                <TwoImagesDisplay openModal={openModal} images={imagesURL} />
              ) : (
                <ThreeOrMoreImagesDisplay openModal={openModal} images={imagesURL} />
              )}
            </>
          )}


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
      </article >

      {isModalOpen && (
        <ImageModal
          images={imagesURL}
          currentIndex={currentImageIndex}
          onClose={closeModal}
        />
      )}</>



  );
};


const ImageDisplay = ({ src, openModal }) => (
  <div className="w-[70%] h-[70%] " onClick={() => openModal(images, index)}>
    <img className="w-[60%] h-[70%] rounded-2xl" src={src} alt="" />
  </div>
);

const TwoImagesDisplay = ({ images, openModal }) => (
  <div className="w-[70%] h-[70%] flex object-cover gap-4">
    {images.map((src, index) => (
      <div className="w-1/2 h-full" key={index} onClick={() => openModal(images, index)}>
        <img className="w-[100%] h-[100%] rounded-2xl object-cover" src={src} alt="" />
      </div>
    ))}
  </div>
);

const ThreeOrMoreImagesDisplay = ({ images, openModal }) => (
  <div className="flex w-full h-full gap-4">
    <div className="h-full">
      <img
        className="object-cover w-full h-full rounded-2xl"
        src={images[0]}
        alt=""
        onClick={() => openModal(images, 0)}
      />
    </div>
    <div className="flex flex-col h-full gap-4">
      <img
        className="object-cover w-full h-[50%] rounded-2xl"
        src={images[1]}
        alt=""
        onClick={() => openModal(images, 1)}
      />
      <div className="w-full h-[50%] relative">
        <img
          className="object-cover w-full h-full rounded-2xl"
          src={images[2]}
          alt=""
          onClick={() => openModal(images, 2)}
        />
        {images.length > 3 && (
          <div onClick={() => openModal(images, 2)} className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white transition-opacity duration-300 ease-in-out bg-black rounded-lg opacity-50 cursor-pointer">
            + {images.length - 3}
          </div>
        )}
      </div>
    </div>
  </div>
);
