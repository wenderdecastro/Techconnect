"use client";
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from "react";
import { Post } from '@/components/post';
import PostInput from '@/components/postInput';
import TrendingTopics from '@/components/trendingTopics';
import MenuBar from '@/components/menuBar';
import { getUser, IsAuthenticated } from '@/utils/authentication';

export default function Home({ params }) {
    const user = getUser();
    const [posts, setPosts] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [postText, setPostText] = useState();


    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('user'));
        if (userLogged) {
            setUser(userLogged); // Define o estado do usuário com as informações armazenadas
        }
    }, []);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/Posts", {
                    method: "GET"
                });

                if (!response.ok) {
                    console.log("Erro ao carregar os posts.");
                    return;
                }

                const data = await response.json();

                const isHashtagSearch = params.query.startsWith('#');
                const query = isHashtagSearch ? params.query.substring(1) : params.query.toLowerCase();



                const filtered = data.filter((post) => {
                    return (
                        post &&
                        post.text &&
                        new RegExp(`\\b${query}\\b`, 'i').test(post.text)
                    );
                });

                console.log(params.text);
                setPosts(filtered);

            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }
        };

        fetchPosts();

    }, []);


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

                        <MenuBar selected={"feed"} />
                    </div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">

                        {posts.map((post, index) => {
                            return <Post loggedId={IsAuthenticated() && user.id} text={post.text} imagesURL={post.imagesURL} id={post.id} encadeado={post.encadeado} key={post.id} userId={post.userId} date={post.date} />

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
