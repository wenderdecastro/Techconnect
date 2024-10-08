"use client";

import { SmallButton } from "@/components/button";
// import { FollowButton, SmallButton } from "@/components/button";
// import { BlueBtn, Exit } from "@/components/button/button";
import { Post } from "@/components/post";
import { ProfileName, Text } from "@/components/texts";
import React, { useEffect, useState } from "react";

const OtherPerfil = ({ params }) => {
  const lista = document.getElementById("lista");
  const [seguidores, setSeguidores] = useState([]);
  const [post, setPost] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState({
    nomeExibicao: "",
    nomeUsuario: "",
    fotoUrlPerfil: "",
    FotoBannerURL: "",
  });

  const getUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/Usuario?ID=" + params.id
      );
      const data = await response.json();

      console.log(data[0].NomeExibicao);

      setUser({
        nomeExibicao: data[0].NomeExibicao,
        nomeUsuario: data[0].NomeUsuario,
        fotoUrlPerfil: data[0].FotoPerfilURL,
        FotoBannerURL: data[0].FotoBannerURL,
      });
    } catch (e) {
      console.log(e);
      // alert("Erro inesperado, não foi possível obter o usuário");
    }
  };

  const Follow = async () => {
    if (followed === false) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  };

  const getFollow = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/UsuarioSeguidores?Usuario_ID=" + params.id
      );
      const data = await response.json();
      console.log(data.length);
      setSeguidores(data.length);
    } catch (error) {
      console.log(e);
      // alert("Erro inesperado, não foi possíve idenficar o seguidors");
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/Posts?userId=" + params.id
      );
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.log(error);
      // alert("Erro ao carregar posts");
    }
  };

  useEffect(() => {
    getUser();
    getFollow();
    getPost();
  }, []);

  return (
    <div className="flex justify-center w-screen h-screen bg-black">
      <div className=" md:md:w-[45%]  md:md:my-[5%]  w-[100%] h-[60%]  rounded-2xl bg-[#050505] absolute">
        <img
          className="w-screen h-[35%]"
          src={user.FotoBannerURL}
          alt="Banner do perfil do usuário"
        />

        <img
          class="relative -top-10 z-45 md:md:mx-[45%] mx-[40%] h-20 w-20 rounded-full ring-2  "
          src={user.fotoUrlPerfil}
          alt="imagem de perfil do usuário logado"
        />

        <div className="flex md:md:flex-row md:md:justify-between flex-col items-center gap-5 bg-neutral-background">
          <ProfileName
            fieldStyle="bg-neutral-background md:md:items-start md:md:ml-[5%] items-center"
            nameStyle="bg-neutral-background text-xl "
            nomeExibicao={`${user.nomeExibicao}`}
            nomeUsuario={`@${user.nomeUsuario}`}
          />

          <div className="flex justify-center w-[45%] h-[15%] bg-neutral-background ">
            <SmallButton
              Inverse={followed === false}
              Style={`h-[5%] items-center px-1 py-1 hover:border-[#2b95d2] `}
              Text={followed === false ? "Seguir Perfil" : "seguindo"}
              onClick={() => Follow()}
            />
          </div>
        </div>

        <div className="flex justify-between w-[40%] my-[5%] md:md:ml-[5%] ml-[16%] bg-neutral-background gap-4">
          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">{seguidores}</Text>
            <Text style="bg-neutral-background opacity-50">Seguidores</Text>
          </div>

          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">0</Text>
            <Text style="bg-neutral-background opacity-50">Likes</Text>
          </div>

          <div className="flex flex-row gap-2 ">
            <Text style="bg-neutral-background ">{post.length}</Text>
            <Text style="bg-neutral-background opacity-50">Posts</Text>
          </div>
        </div>

        {post.length > 0 ? (
          post.map((post, index) => (
            <div className="flex flex-col items-center justify-center py-10 border-t-2  bg-[#050505] border-primary-blue">
              <Post
                text={post.text}
                imagesURL={post.imagesURL}
                id={post.id}
                encadeado={post.encadeado}
                key={post.id}
                userId={post.userId}
                date={post.date}
              />
            </div>
          ))
        ) : (
          <Text style="flex justify-center md:md:justify-start md:md:ml-[5%]  bg-neutral-background ">Nenhum post encontrado.</Text>
        )}
      </div>
    </div>
  );
};

export default OtherPerfil;
