"use client";
import { v4 as uuid } from 'uuid';

import React, { useEffect, useState } from "react";

import { Post } from '@/components/post';
import PostInput from '@/components/postInput';
import TrendingTopics from '@/components/trendingTopics';
import MenuBar from '@/components/menuBar';
import { useRouter } from 'next/navigation';

export default function Home() {

    const [allUsers, setAllUsers] = useState([]);

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [postText, setPostText] = useState();
    const router = useRouter(); // Obtenha o router

    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('user'));
        if (userLogged) {
            setUser(userLogged); // Define o estado do usuário com as informações armazenadas
        }
        console.log('userlogged', userLogged);
    }, []);


    useEffect(() => {
        const fetchUserAndPosts = async () => {
            try {


                // Fetch all users
                const allUsersResponse = await fetch("http://localhost:3001/Usuario", {
                    method: "GET"
                });
                const allUsers = await allUsersResponse.json();
                setAllUsers(allUsers); 

                // Fetch posts
                const postResponse = await fetch("http://localhost:3001/Posts", {
                    method: "GET"
                });
                const data = await postResponse.json();
                setPosts(data); 

               
            } catch (error) {
                console.error("Error fetching user and posts:", error);
            }
        };

        fetchUserAndPosts(); // Chama a função para buscar dados na inicialização
    }, []);


    const handleLogout = () => {
        localStorage.clear(); // Limpa o localStorage
        router.push('/login#'); // Redireciona para a página de login
      };

    const createPost = async (e) => {

        e.preventDefault()

        const postsUrl = []

        console.log(selectedImages);


        await Promise.all(selectedImages.map(async (image) => {
            const urlImage = await Create(image);
            console.log(urlImage);
            postsUrl.push(urlImage);
        }));

        console.log(postsUrl);



        const newPost = {
            id: uuid(),
            date: moment().toDate(),
            userId: user.id,
            text: postText,
            imagesURL: postsUrl,
            encadeado: false
        };

        console.log(newPost);
        console.log(newPost.postsUrl);


        try {
            const response = await fetch("http://localhost:3001/Posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();
            setPosts((prevPosts) => [data, ...prevPosts]);
        } catch (error) {
            console.error("Error creating post:", error);
        }

        setPostText('');
        setSelectedImages([]);

    };

    return (


        <div className="flex justify-center w-screen bg-neutral-background">
            <div className="w-[90%] h-screen overflow-hidden " >
                <header className=" grid grid-cols-[30%,40%,30%] h-[12.5%] ">
                    <div className="h-[30%]">
                        <img src='/images/AppLogo.png' className='h-full' />
                    </div>
                    <div className="">45%</div>
                    <div className="">30%</div>
                </header>

                <div className="grid grid-cols-[30%,40%,30%] h-[90%] ">
                    <div className="h-fill" >

                        <MenuBar selected={"feed"} NomeExibicao={user?.NomeExibicao|| "Usuário desconhecido"} NomeUsuario={user?.NomeUsuario || 'unknown_user'} FotoPerfilURL={user?.FotoPerfilURL || null} onLogOut={handleLogout}/>
                    </div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">
                        <PostInput onSubmit={(e) => createPost(e)} text={postText} onChange={x => setPostText(x.target.value)} onImagesSelected={setSelectedImages} />

                        {posts.map((post) => {
                            // Encontre o usuário correspondente com base no userId do post
                            const postUser = allUsers.find(user => String(user.ID) === String(post.userId));
                           

                            return (
                                <Post
                                    key={post.id}
                                    text={post.text}
                                    imagesURL={post.imagesURL}
                                    id={post.id}
                                    encadeado={post.encadeado}
                                    userId={post.userId}
                                    date={post.date}
                                    FotoPerfilURL={postUser?.FotoPerfilURL || null}
                                    nomeExibicao={postUser?.NomeExibicao || 'Usuário desconhecido'} 
                                    nomeUsuario={postUser?.NomeUsuario || 'unknown_user'} 
                                />
                            );
                        })}



                        <div className='mb-12' />
                    </div>

                    <div className="h-full ">
                        <>
                        </>
                    </div>
                </div>

            </div>

        </div >

    );
}
