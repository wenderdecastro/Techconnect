"use client";
import { Post } from "@/components/post";
import MenuBar from "@/components/menuBar";
import { EditModal } from "@/components/modal/editModal";
import { LargeButton } from "@/components/button";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      
      <LargeButton onClick={() => setIsModalOpen(true)} Text="Abrir o modal"> </LargeButton>

      <EditModal
      
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
