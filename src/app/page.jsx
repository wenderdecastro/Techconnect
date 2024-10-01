"use client";

import { useState } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP
import CustomInput from "@/components/input/input"; // Componente customizado de input
import Text from "@/components/text/text"; // Componente customizado de texto
import Title from "@/components/title/title"; // Componente customizado de título
import { v4 as UUID } from "uuid";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [userData, setUserData] = useState({
    NomeExibicao: "",
    NomeUsuario: "",
    Email: "",
    Senha: "",
    FotoPerfilURL: null,
    FotoBannerURL: null,
  });
  const [isUserCreated, setIsUserCreated] = useState(false); // Novo estado para controle do toggle

  const toggleForm = () => {
    setIsSignIn((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos necessários estão preenchidos
    if (!userData.NomeExibicao || !userData.NomeUsuario || !userData.Email || !userData.Senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const usuario = {
      ID: UUID(),  // O ID do usuário será gerado automaticamente
      NomeExibicao: userData.NomeExibicao,
      NomeUsuario: userData.NomeUsuario,
      Email: userData.Email,
      Senha: userData.Senha,
      FotoPerfilURL: null,
      FotoBannerURL: null,
    };

    console.log("Objeto usuário enviado:", usuario);

    try {
      const response = await fetch('http://localhost:3001/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      console.log("Resposta recebida:", data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar o usuário');
      }

      console.log("Usuário cadastrado com sucesso!");
      setUserData({
        NomeExibicao: "",
        NomeUsuario: "",
        Email: "",
        Senha: "",
        FotoPerfilURL: null,
        FotoBannerURL: null,
      });
      setIsUserCreated(true);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      alert("Erro ao cadastrar o usuário.");
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-login-background bg-cover perspective">
      <div className="p-6 rounded-lg space-y-4 w-[35%]">
        <div className="flex flex-col items-center justify-center">
          <img src={"/images/AppLogo.png"} className="w-[80px]" alt="Logo" />
          <Text className="mt-1">{isSignIn ? "Welcome back!" : "Join Techconnection?"}</Text>
          <Title>{isSignIn ? "Sign in" : "Create account"}</Title>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative w-full h-[200px]">
            <div className={`flip-card ${isSignIn ? "rotate-y-180" : ""}`}>
              <div className="flip-front">
                <div className="flex space-x-4 mb-4">
                  <CustomInput
                    type="text"
                    name="NomeExibicao" // Mudança aqui para usar o nome correto
                    placeholder="Nome de Exibição"
                    size="lg"
                    inputvalue={userData.NomeExibicao}
                    onChange={(e) => handleChange(e, "NomeExibicao")}
                  />
                  <CustomInput
                    type="text"
                    name="NomeUsuario" // Mudança aqui para usar o nome correto
                    placeholder="Nome de Usuário"
                    size="lg"
                    inputvalue={userData.NomeUsuario}
                    onChange={(e) => handleChange(e, 'NomeUsuario')}
                  />
                </div>
                <div className="space-y-4">
                  <CustomInput
                    type="email"
                    name="Email" // Mudança aqui para usar o nome correto
                    placeholder="Email"
                    size="lg"
                    inputvalue={userData.Email}
                    onChange={(e) => handleChange(e, 'Email')}
                  />
                  <CustomInput
                    type="password"
                    name="Senha" // Mudança aqui para usar o nome correto
                    placeholder="Password"
                    size="lg"
                    inputvalue={userData.Senha}
                    onChange={(e) => handleChange(e, "Senha")}
                  />
                </div>
              </div>

              <div className="flip-back">
                <div className="space-y-4">
                  <CustomInput
                    type="text"
                    name="Email" // Mudança aqui para usar o nome correto
                    placeholder="Email"
                    size="lg"
                    inputvalue={userData.Email}
                    onChange={(e) => handleChange(e, "Email")} />
                  <CustomInput
                    type="password"
                    name="Senha" // Mudança aqui para usar o nome correto
                    placeholder="Password"
                    size="lg"
                    inputvalue={userData.Senha}
                    onChange={(e) => handleChange(e, "Senha")} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-white mt-4 flex flex-col items-center space-y-4">
            <button className="mt-5 w-[50%] bg-[#74BDE8] text-white py-3 px-4 rounded-full hover:bg-[#5ca9d4] transition duration-300">
              {isSignIn ? "Sign in" : "Sign up"}
            </button>
            <Text>
              {isSignIn ? (
                <>
                  New to Techconnection?{" "}
                  <a href="#" className="text-[#74BDE8] hover:underline" onClick={toggleForm}>
                    Create account
                  </a>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <a href="#" className="text-[#74BDE8] hover:underline" onClick={toggleForm}>
                    Sign in
                  </a>
                </>
              )}
            </Text>
            {/* Toggle de sucesso após a criação do usuário */}
            {isUserCreated && (
              <div className="w-[50%] items-center justify-center text-center mt-4 p-2 text-primary-white rounded-full transition duration-300">
                Usuário criado com sucesso!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
