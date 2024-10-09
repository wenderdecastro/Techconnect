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
import Link from "next/link";

export const Post = ({ id, date, userId, text, imagesURL, encadeado, viewImages, name,detailed = false, loggedId = null }) => {

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

      <article className={` relative flex flex-col justify-between gap-6 p-6  transition-all ease-in-out w-[90%] h-fit rounded-2xl bg-neutral-gray ${detailed ? "" : "hover:bg-neutral-lighter_gray hover:scale-105"}  `}>
        {!detailed && <Link href={`/post/${id}`} className="absolute top-0 left-0 z-0 w-full h-full cursor-default "></Link>}
        {/* user infos */}

        <div className="h-fit w-[100%] flex gap-2">
          <img
            className="rounded-full size-12 aspect-square"
            src="https://i.pinimg.com/originals/0c/bb/31/0cbb31514710d619571766987c0670c6.jpg"
            alt="imagem de perfil do usuário logado"
          />


          <ProfileName nomeExibicao={"Fulano da Silva"} nomeUsuario={"@Fulano"} />

          <span className="flex gap-2 text-sm text-center opacity-50 ">
            <FaRegClock style={{ scale: "130%", paddingTop: "3.5%" }} />
            {moment(date).fromNow()}
          </span>

        </div>

        {/* post content */}
        <div className="flex flex-col gap-4">
          <Text>{text}</Text>
          {!detailed && imagesURL ? (<>
            {
              imagesURL.length > 0 && (
                <>
                  {imagesURL.length === 1 ? (
                    <ImageDisplay onClick={openModal} src={imagesURL[0]} />
                  ) : imagesURL.length === 2 ? (
                    <TwoImagesDisplay onClick={openModal} images={imagesURL} />
                  ) : (
                    <ThreeOrMoreImagesDisplay onClick={openModal} images={imagesURL} />
                  )}
                </>
              )
            }
          </>
          ) :
            (
              <>
                {imagesURL && <ImageDisplay onClick={openModal} src={imagesURL[currentImageIndex]} />}
              </>


            )
          }



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


const ImageDisplay = ({ src, onClick }) => (
  <div className="w-[100%] h-[100%] z-50 cursor-pointer " onClick={() => onClick(0)}>
    <img className="w-[100%] h-[100%] rounded-2xl" src={src} alt="" />
  </div>
);

const TwoImagesDisplay = ({ images, onClick }) => (
  <div className="z-50 flex object-cover w-full h-full gap-4 cursor-pointer">
    {images.map((src, index) => (
      <div className="w-1/2 h-full" key={index} onClick={() => onClick(index)}>
        <img className="w-[100%] h-[100%] rounded-2xl object-cover" src={src} alt="" />
      </div>
    ))}
  </div>
);

const ThreeOrMoreImagesDisplay = ({ images, onClick }) => (
  <div className="flex w-full h-full gap-4">
    <div className="z-50 w-1/2 h-full cursor-pointer">
      <img
        className="object-cover w-full h-full rounded-2xl"
        src={images[0]}
        alt=""
        onClick={() => onClick(0)}
      />
    </div>
    <div className="flex flex-col w-1/2 h-full gap-4">
      <div className="z-50 h-[50%] cursor-pointer">

        <img
          className="object-cover w-full h-[100%] rounded-2xl"
          src={images[1]}
          alt=""
          onClick={() => onClick(1)}
        />
      </div>

      <div className="w-full h-[50%] relative ">
        <img
          className="object-cover w-full h-full cursor-pointer rounded-2xl "
          src={images[2]}
          alt=""
          onClick={() => onClick(2)}
        />
        {images.length > 3 && (
          <div onClick={() => onClick(2)} className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white transition-opacity duration-300 ease-in-out bg-black rounded-lg opacity-50 cursor-pointer">
            + {images.length - 3}
          </div>
        )}
      </div>
    </div>
  </div>
);
