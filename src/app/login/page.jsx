"use client";


import { useEffect, useState } from "react";
import CustomInput from "@/components/input/input"; // Componente customizado de input
import Text from "@/components/text/text"; // Componente customizado de texto
import Title from "@/components/title/title"; // Componente customizado de título
import { v4 as UUID } from "uuid";
import  ProfileInfo  from "../../components/profileInfo/index";
import { useRouter } from 'next/navigation'


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
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Adiciona um estado para gerenciar mensagens de erro
    const router = useRouter();


    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleForm = () => {
        setIsSignIn((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se os campos necessários estão preenchidos
        if (!userData.NomeExibicao || !userData.NomeUsuario || !userData.Email || !userData.Senha) {
            setErrorMessage("Por favor, preencha todos os campos!");
            return;
        }

        const usuario = {
            ID: UUID(),
            NomeExibicao: userData.NomeExibicao,
            NomeUsuario: userData.NomeUsuario,
            Email: userData.Email,
            Senha: userData.Senha,
            FotoPerfilURL: null,
            FotoBannerURL: null,
        };

        try {
            // Verifica se já existe um usuário com o mesmo nome de exibição ou email
            const checkUserExists = async () => {
                const response = await fetch('http://localhost:3000/Usuario', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                const existingUser = data.find(
                    (user) => user.NomeExibicao === usuario.NomeExibicao || user.Email === usuario.Email
                );

                if (existingUser) {
                    throw new Error('Usuário já cadastrado');
                }
            };

            await checkUserExists();

            const response = await fetch('http://localhost:3000/Usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao cadastrar o usuário');
            }

            setUserData({
                NomeExibicao: "",
                NomeUsuario: "",
                Email: "",
                Senha: "",
                FotoPerfilURL: null,
                FotoBannerURL: null,
            });
            setIsUserCreated(true);
            setErrorMessage(""); // Limpa a mensagem de erro
            alert("Usuário cadastrado com sucesso!", userData);
        } catch (error) {
            console.error("Erro ao cadastrar o usuário:", error);
            setErrorMessage(error.message || "Erro ao cadastrar o usuário.");
        }
    };



    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userData.Email || !userData.Senha) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/Usuario?Email=${encodeURIComponent(userData.Email)}&Senha=${encodeURIComponent(userData.Senha)}`);
            const data = await response.json();

            if (data.length > 0) {

                setUserData(data[0]);
                localStorage.setItem('user', JSON.stringify(data[0]));

                router.push("/home");

                setIsAuthenticated(true);
                setLoginError("");
            } else {
                setLoginError("Email ou senha inválidos!");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login.");
        }
    };

    useEffect(() => {
        if (isSignIn == true) {

            setErrorMessage("");
        }

    }, [isSignIn])

    return (

        <>
            <div className="flex items-center justify-center h-screen bg-cover bg-login-background perspective">
                <div className="p-6 rounded-lg space-y-4 w-[35%]">
                    <div className="flex flex-col items-center justify-center">
                        <img src={"/images/AppLogo.png"} className="w-[80px]" alt="Logo" />
                        <Text className="mt-1">{isSignIn ? "Welcome back!" : "Join Techconnection?"}</Text>
                        <Title>{isSignIn ? "Sign in" : "Create account"}</Title>
                    </div>

                    <form onSubmit={isSignIn ? handleLogin : handleSubmit}>
                        <div className="relative w-full h-[200px]">
                            <div className={`flip-card ${isSignIn ? "rotate-y-180" : ""}`}>
                                <div className="flip-front">
                                    <div className="flex mb-4 space-x-4">
                                        <CustomInput
                                            type="text"
                                            name="NomeExibicao"
                                            placeholder="NickName"
                                            size="lg"
                                            value={userData.NomeExibicao}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    NomeExibicao: e.target.value,
                                                }))
                                            }
                                        />
                                        <CustomInput
                                            type="text"
                                            name="NomeUsuario"
                                            placeholder="Nome"
                                            size="lg"
                                            value={userData.NomeUsuario}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    NomeUsuario: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <CustomInput
                                            type="email"
                                            name="Email"
                                            placeholder="Email"
                                            size="lg"
                                            value={userData.Email}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    Email: e.target.value,
                                                }))
                                            }
                                        />
                                        <CustomInput
                                            type="password"
                                            name="Senha"
                                            placeholder="Password"
                                            size="lg"
                                            value={userData.Senha}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    Senha: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flip-back">
                                    <div className="space-y-4">
                                        <CustomInput
                                            type="email"
                                            name="Email"
                                            placeholder="Email"
                                            size="lg"
                                            value={userData.Email}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    Email: e.target.value,
                                                }))
                                            }
                                        />
                                        <CustomInput
                                            type="password"
                                            name="Senha"
                                            placeholder="Password"
                                            size="lg"
                                            value={userData.Senha}
                                            onChange={(e) =>
                                                setUserData((prevState) => ({
                                                    ...prevState,
                                                    Senha: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-4 space-y-4 text-white">
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

                            {!isSignIn && isUserCreated && (
                                <div className="w-[50%] text-center mt-4 p-2 text-[#55ff2e] rounded-full transition duration-300">
                                    Usuário criado com sucesso!
                                </div>
                            )}
                            {loginError && (
                                <div className="w-[50%] text-center mt-4 p-2 text-red-500 rounded-full transition duration-300">
                                    {loginError}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="w-[50%] text-center mt-4 p-2 text-red-500 rounded-full transition duration-300">
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                    </form>
                </div>
            </div>
            {/* <div className="flex-row mx-auto my-0 bg-black">
                <ProfileInfo />
            </div> */}
        </>

    );
}
