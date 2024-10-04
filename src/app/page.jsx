"use client";
import { Post } from "@/components/post";
import MenuBar from "@/components/menuBar";
import { EditModal } from "@/components/modal/editModal";
import { LargeButton } from "@/components/button";

import ProfileInfo from "@/components/profileInfo";

export default function Home() {
  return (
    <>
      <div className="bg-black flex-row mx-auto my-0">
        <ProfileInfo
        />
      </div>
    </>
  );
}
