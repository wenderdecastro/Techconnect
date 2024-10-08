"use client";
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from "react";
import { CreateImagePost } from '@/utils/azure/config';
import { Post } from '@/components/post';
import PostInput from '@/components/postInput';
import TrendingTopics from '@/components/trendingTopics';
import MenuBar from '@/components/menuBar';
import { getUser, IsAuthenticated } from '@/utils/authentication';
import CustomInput from '@/components/input/input';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();
    const user = getUser();
    const [posts, setPosts] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [postText, setPostText] = useState();
    const [searchText, setSearchText] = useState("")

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

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchText.trim()) {
            // Navigate to the search page with the entered hashtag
            router.push(`/search/${searchText.trim()}`);
        }
    }

    return (


        <div className="flex justify-center w-screen bg-neutral-background">
            <div className="w-[90%] h-screen overflow-hidden " >
                <header className=" grid grid-cols-[30%,40%,30%] h-[12.5%] ">
                    <div className="h-[30%]">
                        <img src='/images/AppLogo.png' className='h-full' />
                    </div>
                    <div className="">45%</div>
                    <div className="h-[30%] flex items-center justify-center p-6">
                        <CustomInput placeholder={"Pesquisa"} value={searchText} onChange={x => setSearchText(x.target.value)} handleKey={handleSearch} type='text' />

                    </div>
                </header>

                <div className="grid grid-cols-[30%,40%,30%] h-[90%] ">
                    <div className="h-fill" >

                        <MenuBar selected={"feed"} />
                    </div>

                    <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6 ">
                        {IsAuthenticated() ? (<><PostInput onSubmit={(e) => createPost(e)} text={postText} onChange={x => setPostText(x.target.value)} onImagesSelected={setSelectedImages} /></>) : null}


                        {posts.map((post, index) => {
                            return <Post loggedId={IsAuthenticated() && user.id} text={post.text} imagesURL={post.imagesURL} id={post.id} encadeado={post.encadeado} key={post.id} userId={post.userId} date={post.date} />

                        })}
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
