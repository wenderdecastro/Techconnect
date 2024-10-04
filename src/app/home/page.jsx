"use client";
import { v4 as uuid } from 'uuid';
import { PostInput } from "@/components/input";
import React, { useEffect, useState } from "react";
import { CreateImagePost } from '@/utils/azure/config';
import { Post } from "@/components/post";
import moment from 'moment';
import Link from 'next/link';

export default function Home() {

    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [postText, setPostText] = useState();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/Posts", {
                    method: "GET"
                });

                if (!response.ok) {
                    console.log("Erro ao carregar os posts.");
                    return;
                }

                const data = await response.json();
                setPosts(data);

            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }
        };

        fetchPosts();

    }, []);

    const createPost = async (e) => {

        e.preventDefault()

        const postsUrl = []

        console.log(selectedImages);


        await Promise.all(selectedImages.map(async (image) => {
            const urlImage = await CreateImagePost(image);
            console.log(urlImage);
            postsUrl.push(urlImage);
        }));

        console.log(postsUrl);



        const newPost = {
            id: uuid(),
            date: moment().toDate(),
            userId: 0,
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
                    <div className="h-fill" >30%</div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">
                        <PostInput onSubmit={(e) => createPost(e)} text={postText} onChange={x => setPostText(x.target.value)} onImagesSelected={setSelectedImages} />

                        {posts.map((post, index) => {
                            return <Post text={post.text} imagesURL={post.imagesURL} id={post.id} encadeado={post.encadeado} key={post.id} userId={post.userId} date={post.date} />

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
