"use client";
import { Post } from "@/components/post";
import MenuBar from "@/components/menuBar";
import { EditModal } from "@/components/modal/editModal";
import { LargeButton } from "@/components/button";
import { useState } from "react";

import ProfileInfo from "@/components/profileInfo";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="bg-black flex-row mx-auto my-0">
        <ProfileInfo />
      </div>
    </>
  );
}
