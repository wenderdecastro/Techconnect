"use client";

import MenuBar from "@/components/menuBar";
import { Post } from "@/components/post";
import ProfileInfo from "@/components/profileInfo";
import { Text } from "@/components/texts";
import { getUser } from "@/utils/authentication";

import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    userId: "",
    nomeExibicao: "",
    nomeUsuario: "",
    fotoUrlPerfil: "",
    FotoBannerURL: "",
  });
  const [seguidores, setSeguidores] = useState([]);

  const gotUserData = async () => {
    const usuarioLogado = getUser();

    if (usuarioLogado) {
      // Verifica se o dado está em formato de string JSON e o converte
      const usuarioLogadoObj = await JSON.parse(usuarioLogado);

      console.log("Usuário logado:", usuarioLogadoObj.ID);
      setUserData({
        userId: usuarioLogadoObj.ID,
        nomeExibicao: usuarioLogadoObj.NomeExibicao,
        nomeUsuario: usuarioLogadoObj.NomeUsuario,
        fotoUrlPerfil: usuarioLogadoObj.FotoPerfilURL,
        FotoBannerURL: usuarioLogadoObj.FotoBannerURL,
      });
    } else {
      console.log("Nenhum usuário logado.");
    }
  };

  const getFollow = async () => {
    const usuarioLogado = getUser();

    try {
      const usuarioLogadoObj = await JSON.parse(usuarioLogado);
      const response = await fetch(
        "http://localhost:3000/UsuarioSeguidores?Usuario_ID=" +
        usuarioLogadoObj.ID
      );
      const data = await response.json();
      // console.log(data.length);
      setSeguidores(data.length);
    } catch (error) {
      console.log(e);
      alert("Erro inesperado, não foi possíve idenficar o seguidors");
    }
  };

  const getPost = async () => {
    const usuarioLogado = getUser();
    try {
      const usuarioLogadoObj = await JSON.parse(usuarioLogado);
      const response = await fetch(
        "http://localhost:3000/Posts?userId=" + usuarioLogadoObj.ID
      );
      const data = await response.json();
      // console.log(data);

      setPosts(data);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar posts");
    }
  };

  const getFollowed = () => { };

  useEffect(() => {
    gotUserData();
    getFollow();
    getPost();
  }, []);
  return (
    <div className="flex justify-center w-screen bg-neutral-background ">
      <div className="w-[90%] h-screen overflow-hidden">
        <header className=" max-sm:hidden grid grid-cols-[30%,40%,30%] h-[12.5%] ">
          <div className="max-sm:hidden h-[30%]  ">
            <img src="/images/AppLogo.png" className="h-full" />
          </div>
          <div className="">45%</div>
          <div className="">30%</div>
        </header>

        <div className={`grid grid-cols-[30%,40%,30%] h-[90%]  `}>
          <div className="  h-fill ">
            <MenuBar
              name={userData.nomeExibicao}
              nameUser={userData.nomeUsuario}
              profilePicture={userData.fotoUrlPerfil}
              selected={"perfil"}
            />
          </div>

          <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">


            <ProfileInfo
              name={userData.nomeExibicao}
              nameUser={userData.nomeUsuario}
              profilePicture={userData.fotoUrlPerfil}
              bannerPicture={userData.FotoBannerURL}
              seguidores={seguidores}
              posts={posts.length}
            />



            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div className="flex flex-col items-center justify-center py-10 border-t-2 bg-[#0D0D0D] border-opacity-30 border-primary-blue">
                  <Post
                    text={post.text}
                    imagesURL={post.imagesURL}
                    id={post.id}
                    encadeado={post.encadeado}
                    key={post.id}
                    userId={post.userId}
                    date={post.date}
                    name={userData.nomeExibicao}
                    nameUser={userData.nomeUsuario}
                    profilePicture={userData.fotoUrlPerfil}
                  />
                </div>
              ))
            ) : (
              <Text style="gap-3 bg-neutral-background ">
                {" "}
                Você possui nenhum post
              </Text>
            )}

            <div className="mb-12" />
          </div>

          <div className=" max-sm:hidden h-full ">
            <></>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
