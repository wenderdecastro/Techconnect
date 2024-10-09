"use client";
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from "react";
import { CreateImagePost } from '@/app/utils/azure/config';
import { Post } from "@/components/post";
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomInput from '@/components/input/input';
import TrendingTopics from '@/components/trendingTopics';
import MenuBar from '@/components/menuBar';
import { Text } from '@/components/texts';

export default function PostDetail({ params }) {

    const [searchText, setSearchText] = useState();
    const [post, setPost] = useState();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchText.trim()) {
            // Navigate to the search page with the entered hashtag
            router.push(`/search/${searchText.trim()}`);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                console.log(params);
                console.log(params.id);
                const response = await fetch("http://localhost:3000/Posts/" + params.id, {
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
                <header className=" grid grid-cols-[30%,40%,30%] h-[10%] m-4">
                    <div className="h-[30%] flex items-center gap-2">
                        <img src='/images/AppLogo.png' className='h-full' />
                        <Text>Techconnect</Text>
                    </div>
                    <div className=""></div>
                    <div className="h-[30%] flex items-center justify-center p-6">
                        <CustomInput placeholder={"Pesquisa"} value={searchText} onChange={x => setSearchText(x.target.value)} handleKey={handleSearch} type='text' />

                    </div>
                </header>

                <div className="grid grid-cols-[30%,40%,30%] h-[90%] ">
                    <div className="h-fill" >

                        <MenuBar selected={"feed"} />
                    </div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">
                        {post && <Post detailed={true} text={post.text} imagesURL={post.imagesURL} id={post.id} encadeado={post.encadeado} key={post.id} userId={post.userId} date={post.date} />}



                        <div className='mb-12' />
                    </div>

                    <div className="h-full ">
                        <TrendingTopics />
                    </div>
                </div>

            </div>

        </div >

    );
}
