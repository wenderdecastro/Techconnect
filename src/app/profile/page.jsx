"use client";

import MenuBar from "@/components/menuBar";
import { Post } from "@/components/post";
import ProfileInfo from "@/components/profileInfo";

import React, { useState } from "react";

const Profile = (props) => {
    const [posts, setPosts] = useState([]);

    const getFollowed = () => {

    }

    
  return (
    <div className="flex justify-center w-screen bg-neutral-background ">
      <div className="w-[90%] h-screen overflow-hidden">
        <header className=" grid grid-cols-[30%,40%,30%] h-[12.5%] ">
          <div className="h-[30%]  ">
            <img src="/images/AppLogo.png" className="h-full" />
          </div>
          <div className="">45%</div>
          <div className="">30%</div>
        </header>

        <div className="grid grid-cols-[30%,40%,30%] h-[100%]  ">
          <div className="h-fill">
            <MenuBar/>
          </div>

          <div className="flex flex-col items-center overflow-y-scroll h-[97.5%] gap-y-6   ">
            <ProfileInfo/>

            {posts.map((post, index) => {
              return (
                <Post
                  text={post.text}
                  imagesURL={post.imagesURL}
                  id={post.id}
                  encadeado={post.encadeado}
                  key={post.id}
                  userId={post.userId}
                  date={post.date}
                />
              );
            })}
            <div className="mb-12" />
          </div>

          <div className="h-full ">
            <></>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
