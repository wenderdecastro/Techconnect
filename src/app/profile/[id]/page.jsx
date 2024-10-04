"use client";

// import { FollowButton, SmallButton } from "@/components/button";
// import { BlueBtn, Exit } from "@/components/button/button";
import { Post } from "@/components/post";
import { ProfileName, Text } from "@/components/texts";
import React, { useEffect, useState } from "react";

const OtherPerfil = ({ params }) => {
  const lista = document.getElementById("lista");
  const [seguidores, setSeguidores] = useState([])
  const [post, setPost] = useState([])
  const [followed, setFollowed] = useState(false)
  const [user, setUser] = useState({
    nomeExibicao: "",
    nomeUsuario: "",
    fotoUrlPerfil: "",
    FotoBannerURL: ""
  });


  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/Usuario?ID=" + params.id);
      const data = await response.json();

      console.log(data[0].NomeExibicao);

      setUser({
        nomeExibicao: data[0].NomeExibicao,
        nomeUsuario: data[0].NomeUsuario,
        fotoUrlPerfil: data[0].FotoPerfilURL,
        FotoBannerURL: data[0].FotoBannerURL
      });

    } catch (e) {
      console.log(e);
      alert("Erro inesperado, não foi possível obter o usuário");
    }
  };

  const Follow = async () => {
    if (followed === false) {
      setFollowed(true)
    } else {
      setFollowed(false)
    }
  }

  const getFollow = async () => {
    try {
      const response = await fetch("http://localhost:3000/UsuarioSeguidores?Usuario_ID=" + params.id);
      const data = await response.json();
      console.log(data.length);
      setSeguidores(data.length)

    } catch (error) {
      console.log(e);
      alert("Erro inesperado, não foi possíve idenficar o seguidors");
    }
  }

  const getPost = async () => {

    try {
      const response = await fetch("http://localhost:3000/Posts?userId=" + params.id);
      const data = await response.json();
      setPost(data)
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar posts");
    }

  }



  useEffect(() => {
    getUser()
    getFollow()
    getPost()
  }, [])



  return (
    <div className="flex justify-center w-screen h-screen bg-gray-900 ">
      <div className="w-[45%] h-[60%] my-[5%] rounded-2xl bg-neutral-background absolute">
        <img
          className="w-screen h-[35%]"
          src={user.FotoBannerURL}
          alt="Banner do perfil do usuário"
        />

        <img
          className="relative -top-10  z-50 ml-[45%] h-20 w-20 rounded-full ring-2  "
          src={user.fotoUrlPerfil}
          alt="imagem de perfil do usuário logado"
        />

        <div className="flex justify-between bg-neutral-background">
          <ProfileName
            fieldStyle="bg-neutral-background ml-[3%]"
            nameStyle="bg-neutral-background text-4xl "
            nomeExibicao={`${user.nomeExibicao}`}
            nomeUsuario={`@${user.nomeUsuario}`}
          />

          <div className="flex justify-center w-[35%] h-[15%] bg-neutral-background ">
            <SmallButton
              Inverse={followed === false}
              Style={`mr-[10%] h-[5%] px-1 py-1 hover:border-[#2b95d2] `}
              Text={followed === false ? "Seguir Perfil" : "seguindo"}
              onClick={() => Follow()}
            />

          </div>
        </div>

        <div className="flex justify-between w-[40%] my-[5%] ml-[5%] bg-neutral-background">

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
          post.map(() => (
            <div className="flex flex-col items-center justify-center py-10 border-t-2 border-primary-blue">

              <Post />

            </div>
          ))
        ) : (
          <Text style="bg-neutral-background">Nenhum post encontrado.</Text>
        )}


      </div>
    </div>
  );
};

export default OtherPerfil;
