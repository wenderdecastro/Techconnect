"use client";
import { v4 as uuid } from 'uuid';
import { PostInput } from "@/components/input";
import React, { useEffect, useState } from "react";
import { CreateImagePost } from '@/utils/azure/config';
import { Post } from "@/components/post";
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PostDetail({ params }) {

    const [post, setPost] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                console.log(params);
                console.log(params.id);
                const response = await fetch("http://localhost:3001/Posts/" + params.id, {
                    method: "GET"
                });

                if (!response.ok) {
                    console.log("Erro ao carregar os posts.");
                    return;
                }

                const data = await response.json();
                setPost(data);

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
                    <div className="h-fill" >30%</div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">
                        {post && <Post detailed={true} text={post.text} imagesURL={post.imagesURL} id={post.id} encadeado={post.encadeado} key={post.id} userId={post.userId} date={post.date} />}



                        <div className='mb-12' />
                    </div>

                    <div className="h-full ">30%</div>
                </div>

            </div>

        </div >

    );
}
