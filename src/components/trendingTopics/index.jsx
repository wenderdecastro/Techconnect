import React, { useState, useEffect } from 'react';
import { MediumText, Text } from '../texts';
import Link from 'next/link';

export default function TrendingTopics() {
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);

    // Função para buscar posts
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/Posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Função para contar as hashtags mais frequentes (sem duplicação por post)
    const getTrendingTopics = (posts) => {
        const countWords = {};

        posts.forEach((post) => {
            // Verifica se post.text está definido e não é nulo
            if (post.text) {
                // Use a regex para extrair todas as hashtags diretamente do texto
                const words = post.text.match(/#\w+/g); // Captura todas as palavras que começam com '#'

                // Se não houver hashtags, continue
                if (!words) return;

                const hashtagsUnicas = new Set(); // Set para garantir contagem única de hashtags por post

                words.forEach((word) => {
                    const lowerCaseWord = word.toLowerCase(); // Converte para minúsculas
                    hashtagsUnicas.add(lowerCaseWord); // Adiciona ao Set (elimina duplicatas no mesmo post)
                });

                // Conta as hashtags únicas encontradas neste post
                hashtagsUnicas.forEach((hashtag) => {
                    countWords[hashtag] = (countWords[hashtag] || 0) + 1;
                });
            }
        });

        // Ordena as hashtags por frequência e limita a 10 tópicos
        const orderedWords = Object.entries(countWords)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        setTopics(orderedWords);
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts(); // Espera a resposta de getPosts
            setPosts(data);
            getTrendingTopics(data); // Passa os posts para contar as hashtags
        };

        fetchData(); // Chama a função
    }, []);

    return (
        <div className="w-full h-full p-6">
            <Text className="mb-4 text-xl font-bold">Em alta</Text>
            {
                topics.map(([word, count], index) => (
                    <Topic key={index} word={word} count={count} />
                ))
            }
        </div>
    );
}

export function Topic({ word, count }) {
    const query = word.startsWith("#") ? word.substring(1, word.length) : word
    return (
        <Link href={`search/${query}`} className="flex flex-col justify-between p-6 my-4 mb-2 bg-neutral-gray rounded-2xl">
            <Text style={""}>{word}</Text>
            <MediumText style={"opacity-50"} className="text-gray-500">{count} posts</MediumText>
        </Link>
    );
}
